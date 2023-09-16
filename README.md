<a name="readme-top"></a>

<div align="center">

<img height="160" src="https://registry.npmmirror.com/@lobehub/assets-logo/1.0.0/files/assets/logo-3d.webp">

<h1 align="center">Lobe Theme</h1>

The modern theme for stable diffusion webui

Legacy verison a.k.a kitchen theme

English · [Russian ](./README-ru_RU.md)· [简体中文](./README-zh_CN.md) · [Changelog](./CHANGELOG.md) · [Report Bug][github-issues-link] · [Request Feature][github-issues-link]

<!-- SHIELD GROUP -->

[![][github-release-shield]][github-release-link]
[![][discord-shield]][discord-link]
[![][github-releasedate-shield]][github-releasedate-link]
[![][github-action-test-shield]][github-action-test-link]
[![][github-action-release-shield]][github-action-release-link]<br/>
[![][github-contributors-shield]][github-contributors-link]
[![][github-forks-shield]][github-forks-link]
[![][github-stars-shield]][github-stars-link]
[![][github-issues-shield]][github-issues-link]
[![][github-license-shield]][github-license-link]

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
> minimum requirements `gradio-3.41.2` & `sd-webui 1.6`

#### Upstream Sync

Star Us，You will receive all releases notifications from GitHub without any delay \~ ⭐️

<details><summary><kbd>Star History</kbd></summary>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=lobehub%2Fsd-webui-lobe-theme&theme=dark&type=Date">
    <img src="https://api.star-history.com/svg?repos=lobehub%2Fsd-webui-lobe-theme&type=Date">
  </picture>
</details>

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

| NPM                             | Repository                            | Description                                                                                                             | Version                                 |
| ------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| [@lobehub/ui][lobe-ui-link]     | [lobehub/lobe-ui][lobe-ui-github]     | Lobe UI is an open-source UI component library dedicated to building AIGC web applications.                             | [![][lobe-ui-shield]][lobe-ui-link]     |
| [@lobehub/lint][lobe-lint-link] | [lobehub/lobe-lint][lobe-lint-github] | LobeLint provides configurations for ESlint, Stylelint, Commitlint, Prettier, Remark, and Semantic Release for LobeHub. | [![][lobe-lint-shield]][lobe-lint-link] |
| @lobehub/assets                 | [lobehub/assets][lobe-assets-github]  | Logo assets, favicons, webfonts for LobeHub.                                                                            |                                         |

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## ⌨️ Local Development

You can use Github Codespaces for online development:

[![][codespaces-shield]][codespaces-link]

Alternatively, you can clone it for local development. To enable hot-reloading mode, you need to start stable diffuison on port `7860` in advance.

[![][bun-shield]][bun-link]

```bash
$ git clone https://github.com/lobehub/sd-webui-lobe-theme.git
$ cd sd-webui-lobe-theme
$ bun install
$ bun dev
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤝 Contributing

Любые виды вкладов приветствуются, если вас интересует внесение кода, не стесняйтесь просмотреть наши проблемы на GitHub [Issues][github-issues-link], чтобы показать нам, из чего вы сделаны.

[![][pr-welcome-shield]][pr-welcome-link]

[![][contributors-contrib]][contributors-link]

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

[![][fossa-license-shield]][fossa-license-link]

</details>

Copyright © 2023 [CanisMinor][profile-link]. <br />
This project is [AGPL3](./LICENSE) licensed.

<!-- LINK GROUP -->

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square
[bun-link]: https://bun.sh
[bun-shield]: https://img.shields.io/badge/-speedup%20with%20bun-black?logo=bun&style=for-the-badge
[codespaces-link]: https://codespaces.new/lobehub/sd-webui-lobe-theme
[codespaces-shield]: https://github.com/codespaces/badge.svg
[contributors-contrib]: https://contrib.rocks/image?repo=lobehub/sd-webui-lobe-theme
[contributors-link]: https://github.com/lobehub/sd-webui-lobe-theme/graphs/contributors
[cover]: https://gw.alipayobjects.com/zos/kitchen/8Ab%24hLJ5ur/cover.webp
[discord-link]: https://discord.gg/AYFPHvv2jT
[discord-shield]: https://img.shields.io/discord/1127171173982154893?color=5865F2&label=discord&labelColor=black&logo=discord&logoColor=white&style=flat-square
[feat-highlight]: https://gw.alipayobjects.com/zos/kitchen/iD%24W4U2y3Y/feat_highlight.webp
[feat-mobile-friendly]: https://gw.alipayobjects.com/zos/kitchen/WpWe6Hw8UT/feat_mobile_friendly.webp
[feat-pwa]: https://gw.alipayobjects.com/zos/kitchen/az49akOKJT/feat_pwa.webp
[feat-sidebar]: https://gw.alipayobjects.com/zos/kitchen/Olum2IjxCW/feat_sidebar.webp
[feat-theme-modify]: https://gw.alipayobjects.com/zos/kitchen/CbhlynwJYg/feat_theme_modify.webp
[feat-thememode]: https://gw.alipayobjects.com/zos/kitchen/nSFtJidWUR/feat_thememode.webp
[fossa-license-link]: https://app.fossa.com/projects/git%2Bgithub.com%2Flobehub%2Fsd-webui-lobe-theme
[fossa-license-shield]: https://app.fossa.com/api/projects/git%2Bgithub.com%2Flobehub%2Fsd-webui-lobe-theme.svg?type=large
[github-action-release-link]: https://github.com/actions/workflows/lobehub/sd-webui-lobe-theme/release.yml
[github-action-release-shield]: https://img.shields.io/github/actions/workflow/status/lobehub/sd-webui-lobe-theme/release.yml?label=release&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-action-test-link]: https://github.com/actions/workflows/lobehub/sd-webui-lobe-theme/test.yml
[github-action-test-shield]: https://img.shields.io/github/actions/workflow/status/lobehub/sd-webui-lobe-theme/test.yml?label=test&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-contributors-link]: https://github.com/lobehub/sd-webui-lobe-theme/graphs/contributors
[github-contributors-shield]: https://img.shields.io/github/contributors/lobehub/sd-webui-lobe-theme?color=c4f042&labelColor=black&style=flat-square
[github-forks-link]: https://github.com/lobehub/sd-webui-lobe-theme/network/members
[github-forks-shield]: https://img.shields.io/github/forks/lobehub/sd-webui-lobe-theme?color=8ae8ff&labelColor=black&style=flat-square
[github-issues-link]: https://github.com/lobehub/sd-webui-lobe-theme/issues
[github-issues-shield]: https://img.shields.io/github/issues/lobehub/sd-webui-lobe-theme?color=ff80eb&labelColor=black&style=flat-square
[github-license-link]: https://github.com/lobehub/sd-webui-lobe-theme/blob/main/LICENSE
[github-license-shield]: https://img.shields.io/github/license/lobehub/sd-webui-lobe-theme?color=white&labelColor=black&style=flat-square
[github-release-link]: https://github.com/lobehub/sd-webui-lobe-theme/releases
[github-release-shield]: https://img.shields.io/github/v/release/lobehub/sd-webui-lobe-theme?color=369eff&labelColor=black&logo=github&style=flat-square
[github-releasedate-link]: https://github.com/lobehub/sd-webui-lobe-theme/releases
[github-releasedate-shield]: https://img.shields.io/github/release-date/lobehub/sd-webui-lobe-theme?labelColor=black&style=flat-square
[github-stars-link]: https://github.com/lobehub/sd-webui-lobe-theme/network/stargazers
[github-stars-shield]: https://img.shields.io/github/stars/lobehub/sd-webui-lobe-theme?color=ffcb47&labelColor=black&style=flat-square
[lobe-assets-github]: https://github.com/lobehub/lobe-assets
[lobe-chat]: https://github.com/lobehub/lobe-chat
[lobe-commit]: https://github.com/lobehub/lobe-commit/tree/master/packages/lobe-commit
[lobe-i18n]: https://github.com/lobehub/lobe-commit/tree/master/packages/lobe-i18n
[lobe-lint-github]: https://github.com/lobehub/lobe-lint
[lobe-lint-link]: https://www.npmjs.com/package/@lobehub/lint
[lobe-lint-shield]: https://img.shields.io/npm/v/@lobehub/lint?color=369eff&labelColor=black&logo=npm&logoColor=white&style=flat-square
[lobe-ui-github]: https://github.com/lobehub/lobe-ui
[lobe-ui-link]: https://www.npmjs.com/package/@lobehub/ui
[lobe-ui-shield]: https://img.shields.io/npm/v/@lobehub/ui?color=369eff&labelColor=black&logo=npm&logoColor=white&style=flat-square
[pr-welcome-link]: https://github.com/lobehub/lobe-chat/pulls
[pr-welcome-shield]: https://img.shields.io/badge/🤯_pr_welcome-%E2%86%92-ffcb47?labelColor=black&style=for-the-badge
[profile-link]: https://github.com/canisminor1990
