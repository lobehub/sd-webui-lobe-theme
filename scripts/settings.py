from fastapi import FastAPI

import modules.scripts as scripts
import os
from typing import Any

from modules import shared
from modules import script_callbacks

from scripts.lib.lobe_log import LobeLog
from scripts.lib.api import LobeApi
from scripts.lib.config import LobeConfig
from scripts.lib.package import LobePackage
from scripts.lib.locale import LobeLocale

def init_lobe(_: Any, app: FastAPI, **kwargs):
    LobeLog.info("Initializing Lobe")

    package = LobePackage()
    locale = LobeLocale()
    config = LobeConfig()
    api = LobeApi(config, package, locale)
    api.create_api_route(app)



script_callbacks.on_app_started(init_lobe)
