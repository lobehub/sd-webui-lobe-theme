import json
import os
from pathlib import Path

from scripts.lib.lobe_log import LobeLog

EXTENSION_FOLDER = Path(__file__).parent.parent.parent
CONFIG_FILENAME = Path(EXTENSION_FOLDER, "lobe_theme_config.json")


LobeLog.debug(f"EXTENSION_FOLDER: {EXTENSION_FOLDER}")
LobeLog.debug(f"CONFIG_FILENAME: {CONFIG_FILENAME}")


class LobeConfig:
    def __init__(self):
        self.config_file = CONFIG_FILENAME
        self.config = None
        self.load_config()

    def load_config(self):
        if os.path.exists(self.config_file):
            LobeLog.debug(f"Loading config from {self.config_file}")

            try:
                with open(self.config_file, 'r', encoding='utf-8') as f:
                    self.config = json.load(f)
            except (json.JSONDecodeError, OSError) as e:
                LobeLog.debug(f"Failed to load config: {e}")
                self.config = LobeConfig.default()
        else:
            LobeLog.debug(f"Config file not found")
            self.config = LobeConfig.default()

    def is_empty(self):
        return "empty" in self.config and self.config['empty']

    def json(self):
        return json.dumps(self.config, ensure_ascii=False)

    def delete(self):
        if os.path.exists(self.config_file):
            os.remove(self.config_file)
            self.config = LobeConfig.default()
            return True

        return False

    def save(self, settings):
        # Persist flat settings only (ignore export wrapper / empty marker)
        if isinstance(settings, dict) and "setting" in settings and isinstance(settings["setting"], dict):
            settings = settings["setting"]

        cleaned = {k: v for k, v in settings.items() if k not in ("empty", "schemaVersion", "exportedAt")}
        self.config = cleaned

        tmp_file = Path(str(self.config_file) + ".tmp")
        try:
            with open(tmp_file, 'w', encoding='utf-8') as f:
                json.dump(self.config, f, indent=2, ensure_ascii=False)
                f.write("\n")
            os.replace(tmp_file, self.config_file)
        except OSError as e:
            LobeLog.debug(f"Failed to save config: {e}")
            if tmp_file.exists():
                try:
                    tmp_file.unlink()
                except OSError:
                    pass
            raise

    @staticmethod
    def default():
        # default config is handled from client side @see src/store/index.tsx
        return {'empty': True}
