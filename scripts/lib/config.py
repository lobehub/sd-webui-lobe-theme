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

            with open(self.config_file, 'r') as f:
                self.config = json.load(f)
        else:
            LobeLog.debug(f"Config file not found")
            self.config = LobeConfig.default()

    def is_empty(self):
        return "empty" in self.config and self.config['empty']

    def json(self):
        return json.dumps(self.config)

    def delete(self):
        if os.path.exists(self.config_file):
            os.remove(self.config_file)
            self.config = LobeConfig.default()
            return True

        return False

    def save(self, settings):
        self.config = settings
        with open(self.config_file, 'w') as f:
            f.write(json.dumps(self.config, indent=2))
            f.close()

    @staticmethod
    def default():
        # default config is handled from client side @see src/store/index.tsx
        return {'empty': True}
