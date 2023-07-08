from modules import shared


class LobeLogClass:

    def __init__(self):
        # added a launch argument to enable debug mode @see preload.py
        # just add --lobe-debug to the launch arguments
        self.logging_enabled = shared.cmd_opts.lobe_debug

    def debug(self, message: str):
        if self.logging_enabled:
            print(f"[Lobe:DEBUG]: {message}")

    def info(self, message: str):
        print(f"[Lobe]: {message}")


LobeLog = LobeLogClass()
