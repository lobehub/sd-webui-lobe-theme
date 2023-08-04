<a name="readme-top"></a>

<div align="center">

<img width="160" src="https://npm.elemecdn.com/@lobehub/assets-logo@1.0.0/assets/logo-3d.webp">

<h1 align="center">Lobe Theme</h1>

The modern theme for stable diffusion webui

Legacy verison a.k.a kitchen theme

English · [Russian ](./README-ru_RU.md)· [简体中文](./README-zh_CN.md) · [Changelog](./CHANGELOG.md) · [Report Bug][issues-url] · [Request Feature][issues-url]

<!-- SHIELD GROUP -->

[![release][release-shield]][release-url]
[![releaseDate][release-date-shield]][release-date-url]
[![ciTest][ci-test-shield]][ci-test-url]
[![ciRelease][ci-release-shield]][ci-release-url] <br/>
[![contributors][contributors-shield]][contributors-url]
[![forks][forks-shield]][forks-url]
[![stargazers][stargazers-shield]][stargazers-url]
[![issues][issues-shield]][issues-url]

</div>

![][cover]

> 📦 After **Version 2.0.0** Kitchen theme was renamed to **Lobe Theme**. The legacy version can be accessed at [sd-webui-kitchen-theme-legacy](https://github.com/canisminor1990/sd-webui-kitchen-theme-legacy)

<details>
<summary><kbd>Table of contents</kbd></summary>

#### TOC

- [✨ Features](#-features)
- [📦 Installation](#-installation)
- [🤯 Usage](#-usage)
- [🖥 Environment Support](#-environment-support)
- [⌨️ Local Development](#️-local-development)
- [🤝 Contributing](#-contributing)
- [🔗 Credits](#-credits)

####

</details>

## ✨ Features

- [x] 🌗 Supports light and dark themes, with the ability to quickly switch in the navigation bar
- [x] 🌈 Supports custom theme colors and neutral colors, with the option to customize the logo
- [x] 🪄 Supports one-click formatting of the prompt, with a simple tag editor provided
- [x] 🎛️ Highly customizable sidebar, with a quick settings sidebar on the left and a model sidebar on the right
- [x] 🖼️ Adjustable canvas ratio, ensuring that generated images are always displayed at the top
- [x] 📱 Mobile-friendly, with partial optimization for mobile screens
- [x] 🌍Support i18n and welcome [PR](https://github.com/canisminor1990/sd-webui-lobe-theme/tree/main/locales) contributions
- [x] 📝 Syntax highlighting in the prompt input box
- [x] 📦 Support [PWA](https://support.google.com/chrome/answer/9658361) progressive web app

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📦 Installation

#### Method 1

Search for `Lobe Theme` or `Kitchen Theme` in the stable diffusion webui plugin market and install it.

> 👉 Note: **Version 2.0.0** was renamed to **Lobe Theme**

#### Method 2

As an extension (recommended), clone the repository to your extension folder:

```shell
git clone "https://github.com/canisminor1990/sd-webui-lobe-theme" extensions/lobe-theme
```

> 👉 Note: minimum requirements gradio-3.23.0 & sd-webui [4c1ad74](https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/4c1ad743e3baf1246db0711aa0107debf036a12b)

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤯 Usage

![][feat-thememode]

#### Light and Dark Themes

> 👉 Tip: You can quickly switch between light and dark themes in the upper-right corner of the navigation bar.

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

> 👉 Tip: Click the `⚙` icon in the upper-right corner to open the settings panel. The current available settings are as follows:

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

> 👉 Tip: Click the `⚙` icon in the upper-right corner to open the settings panel. The current available settings are as follows:

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

> 👉 Tip: Convert full-width punctuation to half-width, remove extra spaces, add missing commas, and move the Extra-Networks model to the end.

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

> ⚠️ There is currently a known compatibility issue with styles on Firefox browser.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## ⌨️ Local Development

You can use Gitpod for online development:

[Open in Gitpod][gitpod-url]

Alternatively, you can clone it for local development. To enable hot-reloading mode, you need to start stable diffuison on port `7860` in advance.

```bash
$ git clone https://github.com/canisminor1990/sd-webui-lobe-theme.git
$ cd sd-webui-lobe-theme
$ pnpm install
$ pnpm start
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤝 Contributing

<!-- CONTRIBUTION GROUP -->

> 📊 Total: <kbd>**11**</kbd>

<a href="https://github.com/canisminor1990" title="canisminor1990">
  <img src="https://avatars.githubusercontent.com/u/17870709?v=4" width="50" />
</a>
<a href="https://github.com/actions-user" title="actions-user">
  <img src="https://avatars.githubusercontent.com/u/65916846?v=4" width="50" />
</a>
<a href="https://github.com/apps/dependabot" title="dependabot[bot]">
  <img src="https://avatars.githubusercontent.com/in/29110?v=4" width="50" />
</a>
<a href="https://github.com/bropines" title="bropines">
  <img src="https://avatars.githubusercontent.com/u/57861007?v=4" width="50" />
</a>
<a href="https://github.com/Nevysha" title="Nevysha">
  <img src="https://avatars.githubusercontent.com/u/122687716?v=4" width="50" />
</a>
<a href="https://github.com/axilesoft" title="axilesoft">
  <img src="https://avatars.githubusercontent.com/u/13805136?v=4" width="50" />
</a>
<a href="https://github.com/web-97" title="web-97">
  <img src="https://avatars.githubusercontent.com/u/46352788?v=4" width="50" />
</a>
<a href="https://github.com/antfu" title="antfu">
  <img src="https://avatars.githubusercontent.com/u/11247099?v=4" width="50" />
</a>
<a href="https://github.com/StimeKe" title="StimeKe">
  <img src="https://avatars.githubusercontent.com/u/25315788?v=4" width="50" />
</a>
<a href="https://github.com/alwayshopeless" title="alwayshopeless">
  <img src="https://avatars.githubusercontent.com/u/38844539?v=4" width="50" />
</a>
<a href="https://github.com/sidmorizon" title="sidmorizon">
  <img src="https://avatars.githubusercontent.com/u/5180361?v=4" width="50" />
</a>

<!-- CONTRIBUTION END -->

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🔗 Credits

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

#### 📝 License

Copyright © 2023 [CanisMinor][profile-url]. <br />
This project is [AGPL3](./LICENSE) licensed.

<!-- LINK GROUP -->

[cover]: https://gw.alipayobjects.com/zos/kitchen/8Ab%24hLJ5ur/cover.webp
[feat-highlight]: https://gw.alipayobjects.com/zos/kitchen/iD%24W4U2y3Y/feat_highlight.webp
[feat-mobile-friendly]: https://gw.alipayobjects.com/zos/kitchen/WpWe6Hw8UT/feat_mobile_friendly.webp
[feat-sidebar]: https://gw.alipayobjects.com/zos/kitchen/Olum2IjxCW/feat_sidebar.webp
[feat-theme-modify]: https://gw.alipayobjects.com/zos/kitchen/CbhlynwJYg/feat_theme_modify.webp
[feat-thememode]: https://gw.alipayobjects.com/zos/kitchen/nSFtJidWUR/feat_thememode.webp
[feat-pwa]: https://gw.alipayobjects.com/zos/kitchen/az49akOKJT/feat_pwa.webp
[profile-url]: https://github.com/canisminor1990
[gitpod-url]: https://gitpod.io/#https://github.com/canisminor1990/sd-webui-lobe-theme

<!-- SHIELD LINK GROUP -->

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square

<!-- release -->

[release-shield]: https://img.shields.io/github/v/release/canisminor1990/sd-webui-lobe-theme?style=flat&sort=semver&logo=github
[release-url]: https://github.com/canisminor1990/sd-webui-lobe-theme/releases

<!-- releaseDate -->

[release-date-shield]: https://img.shields.io/github/release-date/canisminor1990/sd-webui-lobe-theme?style=flat
[release-date-url]: https://github.com/canisminor1990/sd-webui-lobe-theme/releases

<!-- ciTest -->

[ci-test-shield]: https://github.com/canisminor1990/sd-webui-lobe-theme/workflows/Test%20CI/badge.svg
[ci-test-url]: https://github.com/canisminor1990/sd-webui-lobe-theme/actions/workflows/test.yml

<!-- ciRelease -->

[ci-release-shield]: https://github.com/canisminor1990/sd-webui-lobe-theme/workflows/Build%20and%20Release/badge.svg
[ci-release-url]: https://github.com/canisminor1990/sd-webui-lobe-theme/actions/workflows/release.yml

<!-- contributors -->

[contributors-shield]: https://img.shields.io/github/contributors/canisminor1990/sd-webui-lobe-theme.svg?style=flat
[contributors-url]: https://github.com/canisminor1990/sd-webui-lobe-theme/graphs/contributors

<!-- forks -->

[forks-shield]: https://img.shields.io/github/forks/canisminor1990/sd-webui-lobe-theme.svg?style=flat
[forks-url]: https://github.com/canisminor1990/sd-webui-lobe-theme/network/members

<!-- stargazers -->

[stargazers-shield]: https://img.shields.io/github/stars/canisminor1990/sd-webui-lobe-theme.svg?style=flat
[stargazers-url]: https://github.com/canisminor1990/sd-webui-lobe-theme/stargazers

<!-- issues -->

[issues-shield]: https://img.shields.io/github/issues/canisminor1990/sd-webui-lobe-theme.svg?style=flat
[issues-url]: https://github.com/canisminor1990/sd-webui-lobe-theme/issues/new/choose
