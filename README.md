# Lobe Theme Neo

Lobe Theme adaptation for Forge Neo / Gradio 4 with a soft light/dark switch, Neo-specific layout fixes, and SplitView support.

Russian: [README.ru-RU.md](./README.ru-RU.md)

## Features

- Replaces the default Forge Neo shell with the Lobe Theme layout, including the header, sidebars, settings, prompt tools, and Extra Networks integration.
- Uses a soft light/dark switch based on `classList` and `history.replaceState` instead of a full theme reload.
- Detects Forge Neo / Gradio 4 and applies Neo-specific CSS, footer links, and DOM handling.
- Improves Extra Networks refresh behavior for Neo.
- Adds SplitView placement beside the gallery, with Enqueue placement support when `agent-scheduler-neo` is installed.
- Saves UI settings in `localStorage` (`SD-LOBE-SETTING`) and `lobe_theme_config.json` via `/lobe/config`.
- Includes styling hooks for companion extensions such as ADetailer Neo, TIPO, aspect-ratio-helper, dynamic-prompts, and Booru Tags Gacha.

## Installation

1. Place this folder in Forge Neo `extensions/` as `lobe-theme-neo`.
2. Disable any other Lobe Theme extension to avoid conflicts.
3. Fully restart the WebUI.

## Usage

1. Restart the WebUI and open the usual Forge Neo interface.
2. Use the header controls to switch light/dark mode.
3. Open the settings panel to adjust appearance, sidebars, Extra Networks behavior, and SplitView options.
4. If a setting changes the layout structure, the extension may ask for a reload.

## Notes

- This package targets the Forge Neo interface included here. Studio, Editorial, and Pipeline modes are not part of this package.
- `javascript/main.js` must exist; this extension is not usable from source files alone.
- A full page refresh after updating can help if browser assets are cached.
- Current package version in `package.json`: `3.5.4-forge.neo.2`.

## Development

The source tree includes a Vite/React toolchain. If you modify the frontend source, rebuild the bundle so `javascript/main.js` matches your changes.

Typical workflow:

```bash
npm install
npm run build
```
