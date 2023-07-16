import json
import os
from pathlib import Path

from scripts.lib.lobe_log import LobeLog

EXTENSION_FOLDER = Path(__file__).parent.parent.parent
PACKAGE_FILENAME = Path(EXTENSION_FOLDER, "package.json")


LobeLog.debug(f"EXTENSION_FOLDER: {EXTENSION_FOLDER}")
LobeLog.debug(f"PACKAGE_FILENAME: {PACKAGE_FILENAME}")


class LobePackage:
    def __init__(self):
        self.package_file = PACKAGE_FILENAME
        self.package = None
        self.load_package()

    def load_package(self):
        if os.path.exists(self.package_file):
            LobeLog.debug(f"Loading package from package.json")

            with open(self.package_file, 'r') as f:
                self.package = json.load(f)
        else:
            LobeLog.debug(f"Package file not found")
            self.package = {"error": "Package file not found"}

    def is_empty(self):
        return "empty" in self.package and self.package['empty']

    def json(self):
        return json.dumps(self.package)

    @staticmethod
    def default():
        # default package is handled from client side @see src/store/index.tsx
        return {'empty': True}
