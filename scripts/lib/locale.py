import json
import os
from pathlib import Path

from scripts.lib.lobe_log import LobeLog

EXTENSION_FOLDER = Path(__file__).parent.parent.parent

class LobeLocale:
    def __init__(self):
        pass

    def load_language_file(self, lng: str):
        file_path = Path(EXTENSION_FOLDER, f"locales/{lng}.json")

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                language_data = json.load(f)
                return language_data
        except FileNotFoundError:
            return None

    def get_language_file(self, lng: str):
        language_data = self.load_language_file(lng)

        if language_data:
            return language_data
        else:
            LobeLog.debug(f"Language file not found")
            return {"error": "Language file not found"}
    @staticmethod
    def default():
        return {'empty': True}
