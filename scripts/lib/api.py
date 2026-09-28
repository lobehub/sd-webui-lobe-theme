import json
import mimetypes
from pathlib import Path

from fastapi import FastAPI, Response, Request
from fastapi.responses import FileResponse, JSONResponse

from scripts.lib.config import LobeConfig
from scripts.lib.package import LobePackage
from scripts.lib.prompt import LobePrompt
from scripts.lib.locale import LobeLocale
from scripts.lib.lobe_log import LobeLog
from scripts.lib.store import LobeStore
from scripts.lib import choices, loras, system

ASSETS_FOLDER = (Path(__file__).parent.parent.parent / "assets").resolve()
# not every Python registers these, and browsers want the right type for fonts
mimetypes.add_type("font/woff2", ".woff2")
mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("text/css", ".css")

class LobeApi:
    def __init__(self, config: LobeConfig, package: LobePackage, prompt:LobePrompt, locale: LobeLocale):
        self.package = package
        self.prompt = prompt
        self.config = config
        self.locale = locale
        self.store = LobeStore()

    def create_api_route(self, app: FastAPI):

        @app.get("/lobe/package")
        async def lobe_package_get():
            LobeLog.debug("lobe_package_get")

            if self.package.is_empty():
                return Response(content=self.package.json(), media_type="application/json", status_code=404)
            return Response(content=self.package.json(), media_type="application/json", status_code=200)

        @app.get("/lobe/prompt")
        async def lobe_prompt_get():
            LobeLog.debug("lobe_prompt_get")

            if self.prompt.is_empty():
                return Response(content=self.prompt.json(), media_type="application/json", status_code=404)
            return Response(content=self.prompt.json(), media_type="application/json", status_code=200)

        @app.get("/lobe/locales/{lng}")
        async def lobe_locale_get(lng: str):
            LobeLog.debug(f"lobe_locale_get: {lng}")

            language_data = self.locale.get_language_file(lng)

            return Response(content=json.dumps(language_data), media_type="application/json", status_code=200)

        @app.get("/lobe/config")
        async def lobe_config_get():
            LobeLog.debug("lobe_config_get")

            if self.config.is_empty():
                return Response(content=self.config.json(), media_type="application/json", status_code=404)
            return Response(content=self.config.json(), media_type="application/json", status_code=200)

        @app.post("/lobe/config")
        async def lobe_config_save(request: Request):
            LobeLog.debug("lobe_config_save")

            data = await request.json()
            self.config.save(data)
            return Response(
                content=json.dumps({"message": "Config saved successfully"}),
                media_type="application/json", status_code=200
            )

        @app.delete("/lobe/config")
        async def lobe_config_delete():
            LobeLog.debug("lobe_config_delete")

            self.config.delete()
            return Response(
                content=json.dumps({"message": "Config deleted successfully"}),
                media_type="application/json", status_code=200
            )

        # ---------------------------------------------------------- history

        @app.get("/lobe/history")
        async def lobe_history_list(offset: int = 0, limit: int = 200, q: str = "", tab: str = ""):
            return self.store.list_history(max(offset, 0), min(max(limit, 1), 1000), q, tab)

        @app.post("/lobe/history")
        async def lobe_history_add(request: Request):
            try:
                entry = self.store.add_history(await request.json())
            except (ValueError, TypeError) as e:
                return JSONResponse({"error": str(e)}, status_code=400)
            return entry

        @app.delete("/lobe/history/{entry_id}")
        async def lobe_history_delete(entry_id: str):
            return {"deleted": self.store.delete_history(entry_id)}

        @app.delete("/lobe/history")
        async def lobe_history_clear():
            return {"deleted": self.store.clear_history()}

        @app.get("/lobe/history/thumbs/{name}")
        async def lobe_history_thumb(name: str):
            path = self.store.thumb_path(name)
            if path is None:
                return JSONResponse({"error": "not found"}, status_code=404)
            return FileResponse(path, headers={"Cache-Control": "public, max-age=31536000, immutable"})

        # ---------------------------------------------------------- user data

        @app.get("/lobe/userdata/{key}")
        async def lobe_userdata_get(key: str):
            try:
                return {"value": self.store.get_userdata(key)}
            except ValueError as e:
                return JSONResponse({"error": str(e)}, status_code=400)

        @app.put("/lobe/userdata/{key}")
        async def lobe_userdata_set(key: str, request: Request):
            try:
                self.store.set_userdata(key, (await request.json()).get("value"))
            except (ValueError, TypeError, AttributeError) as e:
                return JSONResponse({"error": str(e)}, status_code=400)
            return {"ok": True}

        # ---------------------------------------------------------- models

        @app.get("/lobe/loras")
        def lobe_loras():
            return loras.list_loras()

        @app.get("/lobe/model")
        def lobe_model():
            return loras.current_model()

        @app.get("/lobe/system")
        def lobe_system():
            return system.stats()

        @app.get("/lobe/choices")
        def lobe_choices():
            return choices.choices()

        # ---------------------------------------------------------- local assets

        @app.get("/lobe/assets/{path:path}")
        async def lobe_assets(path: str):
            target = (ASSETS_FOLDER / path).resolve()
            if ASSETS_FOLDER not in target.parents or not target.is_file():
                return JSONResponse({"error": "not found"}, status_code=404)
            return FileResponse(target, headers={"Cache-Control": "public, max-age=86400"})
