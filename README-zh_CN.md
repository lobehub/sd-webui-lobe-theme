<a name="readme-top"></a>

<div align="center">

<img width="160" src="https://npm.elemecdn.com/@lobehub/assets-logo/assets@1.0.0/logo-3d.webp">

<h1 align="center">Lobe Theme</h1>

高定 Stable Diffusion 现代主题, 诸多体验优化

历史版本为 Kitchen Theme

[English](./README.md) · 简体中文 · [变更日志](./CHANGELOG.md) · [反馈问题][issues-url] · [功能建议][issues-url]

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

<details>
<summary><kbd>文档目录</kbd></summary>

#### TOC

- [✨ 主题特性](#-主题特性)
- [📦 插件安装](#-插件安装)
- [🤯 使用说明](#-使用说明)
- [🖥 兼容环境](#-兼容环境)
- [⌨️ 本地开发](#️-本地开发)
- [🤝 参与贡献](#-参与贡献)
- [🔗 链接](#-链接)

####

</details>

<br/>

> 📦 **Version 2.0.0** 后更名为 **Lobe Theme**, 遗产版本可以可访问 [sd-webui-kitchen-theme-legacy](https://github.com/canisminor1990/sd-webui-kitchen-theme-legacy)

## ✨ 主题特性

- [x] 🌗 支持亮暗色主题，可以导航栏快速切换
- [x] 🌈 支持主题颜色和中性色自定义，支持 Logo 自定义
- [x] 🪄 支持 Prompt 一键格式化，并提供简易的标签编辑器
- [x] 🎛️ 高定制侧边栏，左侧为快捷设置侧边栏，右侧为模型侧边栏
- [x] 🖼️ 可调节画板比例，使生成图像始终置顶
- [x] 📱 移动端友好，针对手机屏幕完成部分优化
- [x] 🌍 支持 i18n 并欢迎提交 [PR](https://github.com/canisminor1990/sd-webui-lobe-theme/tree/main/locales) 贡献
- [x] 📝 语法高亮的 Prompt 输入框
- [x] 📦 支持 [PWA](https://support.google.com/chrome/answer/9658361?hl=zh-Hans) 渐进式 Web 应用

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📦 插件安装

#### 方法一

通过 stable diffusion webui 插件市场搜索 `Lobe Theme` 或 `Kitchen Theme` 进行安装

> 👉 提示：**Version 2.0.0** 后更名为 **Lobe Theme**

#### 方法二

作为扩展（推荐） 将存储库克隆到您的扩展文件夹中：

```shell
git clone "https://github.com/canisminor1990/sd-webui-lobe-theme" extensions/lobe-theme
```

> 👉 提示：最低要求 gradio-3.23.0 & sd-webui [4c1ad74](https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/4c1ad743e3baf1246db0711aa0107debf036a12b)

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤯 使用说明

![][feat-thememode]

#### 亮暗色主题

> 👉 Tip: 可在右上角导航栏快速切换

当前主题支持亮暗色双主题，如果你想强制使用暗色模式，使用参数 `--theme=dark` 启动您的 WebUI。例如，在 Windows 上，您的 `webui-user.bat` 应包括：

```shell
set COMMANDLINE_ARGS= --theme=dark
```

或通过 URL Props 直接切换

```shell
http://localhost:7860/?__theme=light
http://localhost:7860/?__theme=dark
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-theme-modify]

#### 主体定制

> 👉 Tip: 右上角 `⚙` 图标打开设置面板，当前可用设置如下

- **Theme**
  - Primary color 主题色：目前提供 `13` 种主题颜色搭配
  - Neutral color 中性色：目前提供 `6` 种不同色彩倾向灰阶搭配
  - Logo type 徽标种类：`Lobe` `Kitchen` `自定义`
    - Logo 自定义：支持 `img url` `base64` `emoji`，当填入单个 emoji 时会自动替换为 3D Fluent Emoji
    - Title 标题自定义：自定义站点名称

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-highlight]

#### Prompt 语法高亮

按 Stable Diffusion 语法规则，自动染色 prompt 显示

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-sidebar]

#### 侧边栏定制

> 👉 Tip: 右上角 `⚙` 图标打开设置面板，当前可用设置如下

- **Prompt Textarea**
  - Display mode: `scroll 固定高度滚动` | `resizable 按文本行数缩放`
- **Sidebar**
  - Default expand 默认展开: `true`
  - Display mode: `fixed 固定` | `float 悬浮`
  - Default width 默认宽度: `280`
- **ExtraNetwork Sidebar**
  - Enable 启用: `true`
  - Default expand 默认展开: `true`
  - Display mode: `fixed 固定` | `float 悬浮`
  - Default Width 默认宽度: `340`
  - Default card size 模型卡片默认尺寸: `86`

<details>
<summary><kbd>推荐系统设置</kbd></summary>

#### Extra-Networks 扩展模型视窗

- 拇指视图
- 卡牌宽度: 86
- 卡牌高度: 128

<br/>

#### Quick-Setting 快捷设置

```txt
sd_model_checkpoint, sd_vae, CLIP_stop_at_last_layers, img2img_background_color, img2img_color_correction, samples_save, samples_format, grid_save, return_grid,  n_rows, live_previews_enable, show_progress_every_n_steps, live_preview_refresh_period
```

</details>

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-mobile-friendly]

#### 移动端适配

针对移动端完成部分便捷性适配设计，面包屑折叠导航栏，侧边栏适配等，但有余 stable diffusion 界面复杂度和定值难度较高无法保证和桌面端相同的使用体验，有更多想法欢迎反馈。

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-pwa]

#### PWA 渐进式 Web 应用

可以使用渐进式 Web 应用 [PWA](https://support.google.com/chrome/answer/9658361?hl=zh-Hans) 在计算机或移动设备上享受快速 Stable Diffusion 体验

- 在计算机上打开 Chrome
- 打开 Stable Diffusion 网页
- 在地址栏的右上角，点击 `安装` 图标
- 按照屏幕上的说明安装该 PWA

<div align="right">

[![][back-to-top]](#readme-top)

</div>

#### 提示词格式化

点击 Prompt 下方 <kbd>🪄</kbd> 按钮即可将提示词一键格式化

> 👉 Tip: 全角标点转半角，去除多余空格，补充缺失逗号，把 Extra-Networks 模型移动到末尾

格式化前

```text
photorealistic   photo of a handsome male (wizard  :1.2）， <lora:LuisapHotlineStyle:0.5> <lora:ElegantHanfuRuqunStyle:0.2>    short beard, white wizard  shirt, (with golden    trim:0.8),
```

格式化后

```text
photorealistic photo of a handsome male, (wizard:1.2), short beard, white wizard shirt, (with golden trim:0.8), <lora:LuisapHotlineStyle:0.5>, <lora:ElegantHanfuRuqunStyle:0.2>
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🖥 兼容环境

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| last 2 versions                                                                                                                                                                                              | last 2 versions                                                                                                                                                                                      | last 2 versions                                                                                                                                                                                              |

> ⚠️ 目前已知道在 Firefox 火狐浏览器上存在样式兼容问题

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## ⌨️ 本地开发

你可以使用 Gitpod 进行在线开发：

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][gitpod-url]

或者克隆到本地开发, 热更新开发模式需要将 stable diffuison 提前启动到 `7860` 端口:

```bash
$ git clone https://github.com/canisminor1990/sd-webui-lobe-theme.git
$ cd sd-webui-lobe-theme
$ pnpm install
$ pnpm start
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤝 参与贡献

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

## 🔗 链接

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
