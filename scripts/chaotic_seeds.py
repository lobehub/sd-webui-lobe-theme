"""Chaotic seeds: the server half of the theme's Chaotic seeds tool.

The theme draws the controls under Seed (src/features/Tools/chaoticSeeds.ts)
and keeps their state in one hidden textbox per tab: "" when off, "4-15"
(min-max digits) when on. Here every image of the job gets its own seed of
min to max digits, the way the reForge Chaotic Seeds extension did it.
"""
import json
import random

import gradio as gr
from modules import scripts

from scripts.lib.config import CONFIG_FILENAME

MIN_DIGITS = 1
MAX_DIGITS = 15
MAX_JS_INT = 9007199254740991
INFOTEXT_KEY = "Chaotic seeds"


def roll_chaotic_seed(min_digits, max_digits):
    """A seed of min to max digits: the number of digits first, then a value of that many digits."""
    if min_digits > max_digits:
        min_digits, max_digits = max_digits, min_digits
    digits = random.randint(min_digits, max_digits)
    low = 0 if digits == 1 else 10 ** (digits - 1)
    high = min(10 ** digits - 1, MAX_JS_INT)
    return random.randint(low, high)


def parse_range(value):
    """(min, max) digits from "4-15", or None when off or not understood."""
    try:
        low, high = (int(part) for part in str(value or "").strip().split("-"))
    except ValueError:
        return None
    clamp = lambda n: max(MIN_DIGITS, min(MAX_DIGITS, n))
    return clamp(low), clamp(high)


def tool_enabled():
    """Theme Settings -> Tools -> Chaotic seeds (on unless turned off)."""
    try:
        with open(CONFIG_FILENAME, "r", encoding="utf-8") as f:
            return json.load(f).get("enableChaoticSeeds", True) is not False
    except (OSError, ValueError, AttributeError):
        return True


class LobeChaoticSeeds(scripts.Script):
    def title(self):
        return "Chaotic seeds (Lobe Theme)"

    def show(self, is_img2img):
        return scripts.AlwaysVisible

    def ui(self, is_img2img):
        tab = "img2img" if is_img2img else "txt2img"
        # hidden by the extension's style.css; the theme fills it in
        state = gr.Textbox(
            value="",
            label=INFOTEXT_KEY,
            show_label=False,
            lines=1,
            max_lines=1,
            container=False,
            elem_id=f"lobe_chaotic_seeds_{tab}",
        )
        # pasted parameters bring the setting back, or turn it off
        self.infotext_fields = [(state, lambda d: str(d.get(INFOTEXT_KEY, "")))]
        return [state]

    def process(self, p, state, *args):
        digits = parse_range(state)
        if digits is None or not tool_enabled():
            return
        low, high = digits

        # p.all_seeds is what everything downstream reads (the infotext of
        # each image, Processed.seed); it is filled from p.seed before
        # process() runs, so replacing it is the whole job.
        if getattr(p, "all_seeds", None):
            p.all_seeds = [roll_chaotic_seed(low, high) for _ in p.all_seeds]
            p.seed = p.all_seeds[0]
        else:
            p.seed = roll_chaotic_seed(low, high)

        # the variation seeds too, or every image varies the same way
        if getattr(p, "subseed_strength", 0) > 0 and getattr(p, "all_subseeds", None):
            p.all_subseeds = [roll_chaotic_seed(low, high) for _ in p.all_subseeds]
            p.subseed = p.all_subseeds[0]

        # each image's seed is in its infotext already; this records the setting
        p.extra_generation_params[INFOTEXT_KEY] = f"{min(low, high)}-{max(low, high)}"
