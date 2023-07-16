import json
from pathlib import Path

from fastapi import FastAPI, Response, Request

from scripts.lib.config import LobeConfig
from scripts.lib.package import LobePackage
from scripts.lib.locale import LobeLocale
from scripts.lib.lobe_log import LobeLog

class LobeApi:
    def __init__(self, config: LobeConfig, package: LobePackage, locale: LobeLocale):
        self.package = package
        self.config = config
        self.locale = locale
        pass

    def create_api_route(self, app: FastAPI):

        @app.get("/lobe/package")
        async def lobe_package_get():
            LobeLog.debug("lobe_package_get")

            if self.package.is_empty():
                return Response(content=self.package.json(), media_type="application/json", status_code=404)
            return Response(content=self.package.json(), media_type="application/json", status_code=200)

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
