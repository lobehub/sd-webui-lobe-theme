<p align="center">
  <img width="160" src="https://gw.alipayobjects.com/mdn/rms_7d1485/afts/img/A*XDYxSJXBjjwAAAAAAAAAAAAAARQnAQ">
</p>
<h1 align="center">Kitchen Stable Diffusion WebUI</h1>

<div align="center">
  Kitchen WebUI 适配主题 <a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui" target="_blank">AUTOMATIC1111/stable-diffusion-web-ui</a>

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

[English](./README.md) | 简体中文

<br/>

> ⚠️⚠️⚠️ 警告：最低要求 gradio-3.23.0 & sd-webui [4c1ad74](https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/4c1ad743e3baf1246db0711aa0107debf036a12b)

<br/>

## ✨ 特性

- 🌈 支持亮暗色主题。
- 🪄 支持 Prompt 格式化。
- 🎨 基于 Antd CSS Token。

<br/>

## 📦 安装

作为扩展（推荐） 将存储库克隆到您的扩展文件夹中：

```shell
git clone "https://github.com/canisminor1990/sd-web-ui-kitchen-theme" extensions/kitchen-theme
```

当前主题支持亮暗色双主题，如果你想强制使用暗色模式，使用参数 `--theme=dark` 启动您的 WebUI。例如，在 Windows 上，您的 `webui-user.bat` 应包括：

```shell
set COMMANDLINE_ARGS= --theme=dark
```

或通过 URL Props 直接切换

```shell
http://localhost:7860/?__theme=light
http://localhost:7860/?__theme=dark
```

<br/>

## ⚒️ 推荐设置

Extra-Networks 扩展模型视窗

- 拇指视图
- 卡牌宽度: 86
- 卡牌高度: 128

![](https://github.com/canisminor1990/sd-web-ui-kitchen-theme/blob/main/assets/extra-networks.webp?raw=true)

<br/>


## 🪄 提示词格式化

![](https://github.com/canisminor1990/sd-web-ui-kitchen-theme/blob/main/assets/prompt-formatting.webp?raw=true)

> 全角标点转半角，去除多余空格，补充缺失逗号，把 Extra-Networks 模型移动到末尾

格式化前

```text
photorealistic   photo of a handsome male (wizard  :1.2）， <lora:LuisapHotlineStyle:0.5> <lora:ElegantHanfuRuqunStyle:0.2>    short beard, white wizard  shirt, (with golden    trim:0.8), 
```

格式化后

```text
photorealistic photo of a handsome male, (wizard:1.2), short beard, white wizard shirt, (with golden trim:0.8), <lora:LuisapHotlineStyle:0.5>, <lora:ElegantHanfuRuqunStyle:0.2>
```

<br/>


## ⌨️ 本地开发

你可以使用 Gitpod 进行在线开发：

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/canisminor1990/sd-web-ui-kitchen-theme)

或者克隆到本地开发:

```bash
$ git clone https://github.com/canisminor1990/sd-web-ui-kitchen-theme.git
$ cd sd-web-ui-kitchen-theme
$ npm install
$ npm start
```

<br/>

## 🔗 链接

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
