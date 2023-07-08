from fastapi import FastAPI

import modules.scripts as scripts
import gradio as gr
import os
from typing import Any

from modules import shared
from modules import script_callbacks

from scripts.lib.lobe_log import LobeLog
from scripts.lib.api import LobeApi
from scripts.lib.config import LobeConfig


def on_ui_settings():
    section = ('lobe_theme', "Lobe Theme")

    shared.opts.add_option(
        "lobe_theme_config",
        shared.OptionInfo(
            "",
            "Lobe them cache setting (don't edit here)",
            gr.Textbox,
            {"interactive": True},
            section=section,
        ),
    )


def init_lobe(_: Any, app: FastAPI, **kwargs):
    LobeLog.info("Initializing Lobe")

    config = LobeConfig()
    api = LobeApi(config)
    api.create_api_route(app)


script_callbacks.on_ui_settings(on_ui_settings)
script_callbacks.on_app_started(init_lobe)
