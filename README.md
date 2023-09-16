<a name="readme-top"></a>

<div align="center">

<img height="160" src="https://registry.npmmirror.com/@lobehub/assets-logo/1.0.0/files/assets/logo-3d.webp">

<h1 align="center">Lobe Theme</h1>

The modern theme for stable diffusion webui

Legacy verison a.k.a kitchen theme

English · [Russian ](./README-ru_RU.md)· [简体中文](./README-zh_CN.md) · [Changelog](./CHANGELOG.md) · [Report Bug][issues-url] · [Request Feature][issues-url]

<!-- SHIELD GROUP -->

[![release][release-shield]][release-url]
[![releaseDate][release-date-shield]][release-date-url]
[![][license-shield]][fossa-license-url]
[![ciTest][ci-test-shield]][ci-test-url]
[![ciRelease][ci-release-shield]][ci-release-url] <br/>
[![contributors][contributors-shield]][contributors-url]
[![forks][forks-shield]][forks-url]
[![stargazers][stargazers-shield]][stargazers-url]
[![issues][issues-shield]][issues-url]

</div>

![][cover]

> **Warning**\
> `Lobe Theme v3` is compatible with `SD WebUI v1.6` and is not backwards compatible. Versions below `< 1.6` should be moved to the branch [legacy-sd-webui-1.5](https://github.com/lobehub/sd-webui-lobe-theme/tree/legacy-sd-webui-1.5)

<details>
<summary><kbd>Table of contents</kbd></summary>

#### TOC

- [✨ Features](#-features)

- [📦 Installation](#-installation)

- [🤯 Usage](#-usage)

- [🖥 Environment Support](#-environment-support)

- [📦 Ecosystem](#-ecosystem)

- [⌨️ Local Development](#️-local-development)

- [🤝 Contributing](#-contributing)

- [🔗 Links](#-links)

  - [More Products](#more-products)
  - [Credits](#credits)

####

</details>

## ✨ Features

- [x] 🌗 Supports light and dark themes, with the ability to quickly switch in the navigation bar
- [x] 🌈 Supports custom theme colors and neutral colors, with the option to customize the logo
- [x] 🪄 Supports one-click formatting of the prompt, with a simple tag editor provided
- [x] 🎛️ Highly customizable sidebar, with a quick settings sidebar on the left and a model sidebar on the right
- [x] 🖼️ Adjustable canvas ratio, ensuring that generated images are always displayed at the top
- [x] 📱 Mobile-friendly, with partial optimization for mobile screens
- [x] 🌍Support i18n and welcome [PR](https://github.com/lobehub/sd-webui-lobe-theme/tree/main/locales) contributions
- [x] 📝 Syntax highlighting in the prompt input box
- [x] 📦 Support [PWA](https://support.google.com/chrome/answer/9658361) progressive web app

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📦 Installation

#### Method 1

Search for `Lobe Theme` or `Kitchen Theme` in the stable diffusion webui plugin market and install it.

> **Note**\
> **Version 2.0.0** was renamed to **Lobe Theme**

#### Method 2

As an extension (recommended), clone the repository to your extension folder:

```shell
git clone "https://github.com/lobehub/sd-webui-lobe-theme" extensions/lobe-theme
```

> **Important**\
> minimum requirements gradio-3.41.2 & sd-webui 1.6

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤯 Usage

![][feat-thememode]

#### Light and Dark Themes

> **Note**\
> You can quickly switch between light and dark themes in the upper-right corner of the navigation bar.

The current theme supports both light and dark themes. If you want to force dark mode, use the `--theme=dark` argument to launch your WebUI. For example, on Windows, your `webui-user.bat` should include:

```shell
set COMMANDLINE_ARGS= --theme=dark
```

Alternatively, you can switch directly through URL Props:

```shell
http://localhost:7860/?__theme=light
http://localhost:7860/?__theme=dark
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-theme-modify]

#### Theme Customization

> **Note**\
> Click the `⚙` icon in the upper-right corner to open the settings panel. The current available settings are as follows:

- **Theme**
  - Primary color: Currently offers `13` theme color combinations
  - Neutral color: Currently offers `6` different grayscale color combinations
  - Logo type: `Lobe`, `Kitchen`, `Custom`
    - Custom logo: Supports `img url`, `base64`, and `emoji`. When a single emoji is entered, it will be automatically replaced with 3D Fluent Emoji.
    - Custom title: Customize the site name.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-highlight]

#### Prompt Syntax Highlighting

Automatically colorize prompt display according to the Stable Diffusion syntax rules

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-sidebar]

#### Sidebar Customization

> **Note**\
> Click the `⚙` icon in the upper-right corner to open the settings panel. The current available settings are as follows:

- **Prompt Textarea**
  - Display mode: `scroll fixed height` | `resizable by text lines`
- **Sidebar**
  - Default expand: `true`
  - Display mode: `fixed` | `float`
  - Default width: `280`
- **ExtraNetwork Sidebar**
  - Enable: `true`
  - Default expand: `true`
  - Display mode: `fixed` | `float`
  - Default width: `340`
  - Default card size: `86`

<details>
<summary><kbd>Recommended System Settings</kbd></summary>

#### Extra-Networks

- thumbs
- width: 86
- height: 128

<br/>

#### Quick-Setting

```txt
sd_model_checkpoint, sd_vae, CLIP_stop_at_last_layers, img2img_background_color, img2img_color_correction, samples_save, samples_format, grid_save, return_grid,  n_rows, live_previews_enable, show_progress_every_n_steps, live_preview_refresh_period
```

</details>

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-mobile-friendly]

#### Mobile Adaptation

Partial convenience adaptation design has been completed for mobile devices, including breadcrumb foldable navigation bar, sidebar adaptation, etc. However, due to the high complexity and fixed values of the stable diffusion interface, it is difficult to ensure the same user experience as the desktop version. Feedback is welcome for more ideas.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-pwa]

#### Progress Web App

You can use Progressive Web Apps [PWA](https://support.google.com/chrome/answer/9658361) for a fast stable diffusion experience on your computer or mobile device.

- On your computer, open Chrome.
- Go to stable diffusion website you want to install
- At the top right of the address bar, click `Install`
- Follow the onscreen instructions to install the PWA

<div align="right">

[![][back-to-top]](#readme-top)

</div>

#### Prompt formatting

Click the <kbd>🪄</kbd> button below Prompt to format the prompt words with one click.

> **Note**\
> Convert full-width punctuation to half-width, remove extra spaces, add missing commas, and move the Extra-Networks model to the end.

Before formatting:

```text
photorealistic   photo of a handsome male (wizard  :1.2）， <lora:LuisapHotlineStyle:0.5> <lora:ElegantHanfuRuqunStyle:0.2>    short beard, white wizard  shirt, (with golden    trim:0.8),
```

After formatting:

```text
photorealistic photo of a handsome male, (wizard:1.2), short beard, white wizard shirt, (with golden trim:0.8), <lora:LuisapHotlineStyle:0.5>, <lora:ElegantHanfuRuqunStyle:0.2>
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🖥 Environment Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| last 2 versions                                                                                                                                                                                              | last 2 versions                                                                                                                                                                                      | last 2 versions                                                                                                                                                                                              |

> **Warning**\
> There is currently a known compatibility issue with styles on Firefox browser.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📦 Ecosystem

| NPM                            | Repository                            | Description                                                                                                             | Version                                |
| ------------------------------ | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| [@lobehub/ui][lobe-ui-url]     | [lobehub/lobe-ui][lobe-ui-github]     | Lobe UI is an open-source UI component library dedicated to building AIGC web applications.                             | [![][lobe-ui-shield]][lobe-ui-url]     |
| [@lobehub/lint][lobe-lint-url] | [lobehub/lobe-lint][lobe-lint-github] | LobeLint provides configurations for ESlint, Stylelint, Commitlint, Prettier, Remark, and Semantic Release for LobeHub. | [![][lobe-lint-shield]][lobe-lint-url] |
| @lobehub/assets                | [lobehub/assets][lobe-assets-github]  | Logo assets, favicons, webfonts for LobeHub.                                                                            |                                        |

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## ⌨️ Local Development

You can use Gitpod for online development:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][gitpod-url]

Alternatively, you can clone it for local development. To enable hot-reloading mode, you need to start stable diffuison on port `7860` in advance.

```bash
$ git clone https://github.com/lobehub/sd-webui-lobe-theme.git
$ cd sd-webui-lobe-theme
$ pnpm install
$ pnpm start
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤝 Contributing

Contributions of all types are more than welcome, if you are interested in contributing code, feel free to check out our GitHub [Issues][issues-url] to get stuck in to show us what you’re made of.

[![][pr-welcome-shield]][pr-welcome-url]

[![][contributors-contrib]][contributors-url]

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🔗 Links

### More Products

- **[🤖 Lobe Chat][lobe-chat] :** An open-source, extensible (Function Calling), high-performance chatbot framework. It supports one-click free deployment of your private ChatGPT/LLM web application.
- **[🌏 Lobe i18n][lobe-i18n] :** Lobe i18n is an automation tool for the i18n (internationalization) translation process, powered by ChatGPT. It supports features such as automatic splitting of large files, incremental updates, and customization options for the OpenAI model, API proxy, and temperature.
- **[💌 Lobe Commit][lobe-commit] :** Lobe Commit is a CLI tool that leverages Langchain/ChatGPT to generate Gitmoji-based commit messages.

### Credits

- stable-diffusion-webui：<https://github.com/AUTOMATIC1111/stable-diffusion-webui>
- gradio-theme-gallery: <https://huggingface.co/spaces/gradio/theme-gallery>
- cozy-nest: <https://github.com/Nevysha/Cozy-Nest>
- _before `1.0.0` version_
  - sd-web-ui-quickcs: <https://github.com/Gerschel/sd-web-ui-quickcss/>
  - Dark-Themes-SD-WebUI-Automatic1111: <https://github.com/Nacurutu/Dark-Themes-SD-WebUI-Automatic1111>

<div align="right">

[![][back-to-top]](#readme-top)

</div>

---

<details><summary><h4>📝 License</h4></summary>

[![][fossa-license-shield]][fossa-license-url]

</details>

Copyright © 2023 [CanisMinor][profile-url]. <br />
This project is [AGPL3](./LICENSE) licensed.

<!-- LINK GROUP -->

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square
[ci-release-shield]: https://github.com/lobehub/sd-webui-lobe-theme/workflows/Build%20and%20Release/badge.svg
[ci-release-url]: https://github.com/lobehub/sd-webui-lobe-theme/actions/workflows/release.yml
[ci-test-shield]: https://github.com/lobehub/sd-webui-lobe-theme/workflows/Test%20CI/badge.svg
[ci-test-url]: https://github.com/lobehub/sd-webui-lobe-theme/actions/workflows/test.yml
[contributors-contrib]: https://contrib.rocks/image?repo=lobehub/sd-webui-lobe-theme
[contributors-shield]: https://img.shields.io/github/contributors/lobehub/sd-webui-lobe-theme.svg?style=flat
[contributors-url]: https://github.com/lobehub/sd-webui-lobe-theme/graphs/contributors
[cover]: https://gw.alipayobjects.com/zos/kitchen/8Ab%24hLJ5ur/cover.webp
[feat-highlight]: https://gw.alipayobjects.com/zos/kitchen/iD%24W4U2y3Y/feat_highlight.webp
[feat-mobile-friendly]: https://gw.alipayobjects.com/zos/kitchen/WpWe6Hw8UT/feat_mobile_friendly.webp
[feat-pwa]: https://gw.alipayobjects.com/zos/kitchen/az49akOKJT/feat_pwa.webp
[feat-sidebar]: https://gw.alipayobjects.com/zos/kitchen/Olum2IjxCW/feat_sidebar.webp
[feat-theme-modify]: https://gw.alipayobjects.com/zos/kitchen/CbhlynwJYg/feat_theme_modify.webp
[feat-thememode]: https://gw.alipayobjects.com/zos/kitchen/nSFtJidWUR/feat_thememode.webp
[forks-shield]: https://img.shields.io/github/forks/lobehub/sd-webui-lobe-theme.svg?style=flat
[forks-url]: https://github.com/lobehub/sd-webui-lobe-theme/network/members
[fossa-license-shield]: https://app.fossa.com/api/projects/git%2Bgithub.com%2Flobehub%2Fsd-webui-lobe-theme.svg?type=large
[fossa-license-url]: https://app.fossa.com/projects/git%2Bgithub.com%2Flobehub%2Fsd-webui-lobe-theme
[gitpod-url]: https://gitpod.io/#https://github.com/lobehub/sd-webui-lobe-theme
[issues-shield]: https://img.shields.io/github/issues/lobehub/sd-webui-lobe-theme.svg?style=flat
[issues-url]: https://github.com/lobehub/sd-webui-lobe-theme/issues/new/choose
[license-shield]: https://app.fossa.com/api/projects/git%2Bgithub.com%2Flobehub%2Fsd-webui-lobe-theme.svg?type=shield&issueType=license
[lobe-assets-github]: https://github.com/lobehub/lobe-assets
[lobe-chat]: https://github.com/lobehub/lobe-chat
[lobe-commit]: https://github.com/lobehub/lobe-commit/tree/master/packages/lobe-commit
[lobe-i18n]: https://github.com/lobehub/lobe-commit/tree/master/packages/lobe-i18n
[lobe-lint-github]: https://github.com/lobehub/lobe-lint
[lobe-lint-shield]: https://img.shields.io/npm/v/@lobehub/lint?label=%F0%9F%A4%AF%20NPM
[lobe-lint-url]: https://www.npmjs.com/package/@lobehub/lint
[lobe-ui-github]: https://github.com/lobehub/lobe-ui
[lobe-ui-shield]: https://img.shields.io/npm/v/@lobehub/ui?label=%F0%9F%A4%AF%20NPM
[lobe-ui-url]: https://www.npmjs.com/package/@lobehub/ui
[pr-welcome-shield]: https://img.shields.io/badge/🤯_pr_welcome-%E2%86%92-FEE064?style=for-the-badge
[pr-welcome-url]: https://github.com/lobehub/lobe-chat/pulls
[profile-url]: https://github.com/canisminor1990
[release-date-shield]: https://img.shields.io/github/release-date/lobehub/sd-webui-lobe-theme?style=flat
[release-date-url]: https://github.com/lobehub/sd-webui-lobe-theme/releases
[release-shield]: https://img.shields.io/github/v/release/lobehub/sd-webui-lobe-theme?style=flat&sort=semver&logo=github
[release-url]: https://github.com/lobehub/sd-webui-lobe-theme/releases
[stargazers-shield]: https://img.shields.io/github/stars/lobehub/sd-webui-lobe-theme.svg?style=flat
[stargazers-url]: https://github.com/lobehub/sd-webui-lobe-theme/stargazers
