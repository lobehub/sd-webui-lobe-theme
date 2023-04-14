<p align="center">
  <img width="160" src="https://gw.alipayobjects.com/mdn/rms_7d1485/afts/img/A*XDYxSJXBjjwAAAAAAAAAAAAAARQnAQ">
</p>
<h1 align="center">Kitchen Stable Diffusion WebUI</h1>

<div align="center">
  Kitchen Theme for <a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui" target="_blank">AUTOMATIC1111/stable-diffusion-web-ui</a>

<br/>
<br/>

<!-- SHIELD GROUP -->

[![release][release-shield]][release-url]
[![releaseDate][release-date-shield]][release-date-url]
[![ciTest][ci-test-shield]][ci-test-url]
[![ciRelease][ci-release-shield]][ci-release-url]
[![contributors][contributors-shield]][contributors-url]
[![forks][forks-shield]][forks-url]
[![stargazers][stargazers-shield]][stargazers-url]
[![issues][issues-shield]][issues-url]

</div>

![](https://github.com/canisminor1990/sd-web-ui-kitchen-theme/blob/main/assets/screenshot.webp?raw=true)

English | [简体中文](./README-zh_CN.md)

<br/>

> ⚠️⚠️⚠️ Warning: minimum requirements gradio-3.23.0 & sd-webui [4c1ad74](https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/4c1ad743e3baf1246db0711aa0107debf036a12b)

## ✨ Features

- 🌈 Supports light and dark themes.
- 🪄 Supports Prompt formatting.
- 🎨 Based on Antd CSS Token.

<br/>

## 📦 Installation

As an extension (recommended)
Either clone the repo into your extensions folder:

```shell
git clone "https://github.com/canisminor1990/sd-web-ui-kitchen-theme" extensions/kitchen-theme
```

The current theme supports both light and dark themes. If you want to force dark mode, use the `--theme=dark` argument to launch your WebUI. For example, on Windows, your `webui-user.bat` should include:

```shell
set COMMANDLINE_ARGS= --theme=dark
```

Alternatively, you can switch directly through URL Props:

```shell
http://localhost:7860/?__theme=light
http://localhost:7860/?__theme=dark
```

<br/>

## ⚒️ Recommended Settings

Extra-Networks

- thumbs
- width: 86
- height: 128

![](https://github.com/canisminor1990/sd-web-ui-kitchen-theme/blob/main/assets/extra-networks.webp?raw=true)

<br/>

## ⌨️ Local Development

You can use Gitpod for online development:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/canisminor1990/sd-web-ui-kitchen-theme)

Or clone it for local development:

```bash
$ git clone https://github.com/canisminor1990/sd-web-ui-kitchen-theme.git
$ cd sd-web-ui-kitchen-theme
$ npm install
$ npm start
```

<br/>

## 🔗 Credits

- stable-diffusion-webui：https://github.com/AUTOMATIC1111/stable-diffusion-webui
- gradio-theme-gallery: https://huggingface.co/spaces/gradio/theme-gallery
- gradio-types: https://github.com/vnrat/sd-webui-3d-open-pose-editor/tree/4e7a400f7c42a5f9413d182413d950b2f5a58c79/src/%40types
- _before `1.0.0` version_
  - sd-web-ui-quickcs: https://github.com/Gerschel/sd-web-ui-quickcss/
  - Dark-Themes-SD-WebUI-Automatic1111: https://github.com/Nacurutu/Dark-Themes-SD-WebUI-Automatic1111

<br/>

<!-- SHIELD LINK GROUP -->

<!-- release -->

[release-shield]: https://img.shields.io/github/v/release/canisminor1990/sd-web-ui-kitchen-theme?style=flat&sort=semver&logo=github
[release-url]: https://github.com/canisminor1990/sd-web-ui-kitchen-theme/releases

<!-- releaseDate -->

[release-date-shield]: https://img.shields.io/github/release-date/canisminor1990/sd-web-ui-kitchen-theme?style=flat
[release-date-url]: https://github.com/canisminor1990/sd-web-ui-kitchen-theme/releases

<!-- ciTest -->

[ci-test-shield]: https://github.com/canisminor1990/sd-web-ui-kitchen-theme/workflows/Test%20CI/badge.svg
[ci-test-url]: https://github.com/canisminor1990/sd-web-ui-kitchen-theme/actions/workflows/test.yml

<!-- ciRelease -->

[ci-release-shield]: https://github.com/canisminor1990/sd-web-ui-kitchen-theme/workflows/Build%20and%20Release/badge.svg
[ci-release-url]: https://github.com/canisminor1990/sd-web-ui-kitchen-theme/actions/workflows/release.yml

<!-- contributors -->

[contributors-shield]: https://img.shields.io/github/contributors/canisminor1990/sd-web-ui-kitchen-theme.svg?style=flat
[contributors-url]: https://github.com/canisminor1990/sd-web-ui-kitchen-theme/graphs/contributors

<!-- forks -->

[forks-shield]: https://img.shields.io/github/forks/canisminor1990/sd-web-ui-kitchen-theme.svg?style=flat
[forks-url]: https://github.com/canisminor1990/sd-web-ui-kitchen-theme/network/members

<!-- stargazers -->

[stargazers-shield]: https://img.shields.io/github/stars/canisminor1990/sd-web-ui-kitchen-theme.svg?style=flat
[stargazers-url]: https://github.com/canisminor1990/sd-web-ui-kitchen-theme/stargazers

<!-- issues -->

[issues-shield]: https://img.shields.io/github/issues/canisminor1990/sd-web-ui-kitchen-theme.svg?style=flat
[issues-url]: https://img.shields.io/github/issues/canisminor1990/sd-web-ui-kitchen-theme.svg?style=flat
