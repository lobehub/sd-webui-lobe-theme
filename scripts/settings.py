import modules.scripts as scripts
import gradio as gr
import os

from modules import shared
from modules import script_callbacks


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


script_callbacks.on_ui_settings(on_ui_settings)
