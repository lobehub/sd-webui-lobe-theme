import json
import os
from pathlib import Path

from scripts.lib.lobe_log import LobeLog

EXTENSION_FOLDER = Path(__file__).parent.parent.parent
PACKAGE_FILENAME = Path(EXTENSION_FOLDER, "data/prompt.json")


LobeLog.debug(f"EXTENSION_FOLDER: {EXTENSION_FOLDER}")
LobeLog.debug(f"PACKAGE_FILENAME: {PACKAGE_FILENAME}")


class LobePrompt:
    def __init__(self):
        self.prompt_file = PACKAGE_FILENAME
        self.prompt = None
        self.load_prompt()

    def load_prompt(self):
        if os.path.exists(self.prompt_file):
            LobeLog.debug(f"Loading prompt from prompt.json")

            with open(self.prompt_file, 'r', encoding='utf-8') as f:
                self.prompt = json.load(f)
        else:
            LobeLog.debug(f"Prompt file not found")
            self.prompt = {"error": "Prompt file not found"}

    def is_empty(self):
        return "empty" in self.prompt and self.prompt['empty']

    def json(self):
        return json.dumps(self.prompt)

    @staticmethod
    def default():
        # default prompt is handled from client side @see src/store/index.tsx
        return {'empty': True}
