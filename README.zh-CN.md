<a name="readme-top"></a>

<div align="center">

<img height="160" src="https://registry.npmmirror.com/@lobehub/assets-logo/1.0.0/files/assets/logo-3d.webp">

<h1 align="center">Lobe Theme</h1>

高定 Stable Diffusion 现代主题，诸多体验优化<br/><sup>历史版本为 Kitchen Theme</sup>

[English](./README.md)・简体中文・[变更日志](./CHANGELOG.md) · [反馈问题][github-issues-link] · [功能建议][github-issues-link]

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

<details>
<summary><kbd>文档目录</kbd></summary>

#### TOC

- [✨ 主题特性](#-主题特性)
- [📦 插件安装](#-插件安装)
- [🤯 使用说明](#-使用说明)
- [🖥 兼容环境](#-兼容环境)
- [📦 生态系统](#-生态系统)
- [⌨️ 本地开发](#️-本地开发)
- [🤝 参与贡献](#-参与贡献)
- [🔗 链接](#-链接)
  - [更多工具](#更多工具)
  - [参考](#参考)

####

</details>

<br/>

> \[!WARNING]
>
> `Lobe Theme v3` 适配 `SD WebUI v1.6`, 并不向下兼容，`< 1.6` 以下版本移动到分支 [legacy-sd-webui-1.5](https://github.com/lobehub/sd-webui-lobe-theme/tree/legacy-sd-webui-1.5)

## ✨ 主题特性

- [x] 🌗 支持亮暗色主题，可以导航栏快速切换
- [x] 🌈 支持主题颜色和中性色自定义，支持 Logo 自定义
- [x] 🪄 支持 Prompt 一键格式化，并提供简易的标签编辑器
- [x] 🎛️ 高定制侧边栏，左侧为快捷设置侧边栏，右侧为模型侧边栏
- [x] 🖼️ 可调节画板比例，使生成图像始终置顶
- [x] 📱 移动端友好，针对手机屏幕完成部分优化
- [x] 🌍 支持 i18n 并欢迎提交 [PR](https://github.com/lobehub/sd-webui-lobe-theme/tree/main/locales) 贡献
- [x] 📝 语法高亮的 Prompt 输入框
- [x] 📦 支持 [PWA](https://support.google.com/chrome/answer/9658361?hl=zh-Hans) 渐进式 Web 应用

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📦 插件安装

#### 方法一

通过 stable diffusion webui 插件市场搜索 `Lobe Theme` 或 `Kitchen Theme` 进行安装

> \[!NOTE]
>
> **Version 2.0.0** 后更名为 **Lobe Theme**

#### 方法二

作为扩展（推荐） 将存储库克隆到您的扩展文件夹中：

```shell
git clone "https://github.com/lobehub/sd-webui-lobe-theme" extensions/lobe-theme
```

> \[!IMPORTANT]
>
> 最低要求 `gradio-3.41.2` & `sd-webui 1.6`

#### 保持更新

收藏项目，你将从 GitHub 上无延迟地接收所有发布通知～⭐️

<details><summary><kbd>Star History</kbd></summary>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=lobehub%2Fsd-webui-lobe-theme&theme=dark&type=Date">
    <img src="https://api.star-history.com/svg?repos=lobehub%2Fsd-webui-lobe-theme&type=Date">
  </picture>
</details>

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤯 使用说明

![][feat-thememode]

#### 亮暗色主题

> \[!TIP]
>
> 可在右上角导航栏快速切换

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

> \[!TIP]
>
> 右上角 `⚙` 图标打开设置面板，当前可用设置如下

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

> \[!TIP]
>
> 右上角 `⚙` 图标打开设置面板，当前可用设置如下

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

> \[!TIP]
>
> 全角标点转半角，去除多余空格，补充缺失逗号，把 Extra-Networks 模型移动到末尾

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

> \[!CAUTION]
>
> 目前已知道在 Firefox 火狐浏览器上存在样式兼容问题

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📦 生态系统

| NPM                             | 代码库                                | 描述                                                                                                  | 版本                                    |
| ------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------- |
| [@lobehub/ui][lobe-ui-link]     | [lobehub/lobe-ui][lobe-ui-github]     | Lobe UI 是一个专为构建 AIGC 网页应用程序而设计的开源 UI 组件库。                                      | [![][lobe-ui-shield]][lobe-ui-link]     |
| [@lobehub/lint][lobe-lint-link] | [lobehub/lobe-lint][lobe-lint-github] | LobeLint 为 LobeHub 提供 ESlint，Stylelint，Commitlint，Prettier，Remark 和 Semantic Release 的配置。 | [![][lobe-lint-shield]][lobe-lint-link] |
| @lobehub/assets                 | [lobehub/assets][lobe-assets-github]  | LobeHub 的 Logo 资源、favicon、网页字体。                                                             |                                         |

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## ⌨️ 本地开发

你可以使用 Github Codespaces 进行在线开发：

[![][codespaces-shield]][codespaces-link]

或者克隆到本地开发，热更新开发模式需要将 stable diffuison 提前启动到 `7860` 端口:

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

## 🤝 参与贡献

我们非常欢迎各种形式的贡献。如果你对贡献代码感兴趣，可以查看我们的 GitHub [Issues][github-issues-link]，大展身手，向我们展示你的奇思妙想。

[![][pr-welcome-shield]][pr-welcome-link]

[![][contributors-contrib]][contributors-link]

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🔗 链接

### 更多工具

- [🤖 Lobe Chat][lobe-chat] : LobeChat 是一个开源的、可扩展的（Function Calling）高性能聊天机器人框架，支持一键免费部署私人 ChatGPT/LLM 网页应用程序。。
- [🌏 Lobe i18n][lobe-i18n] : Lobe i18n 是一个由 ChatGPT 驱动的 i18n（国际化）翻译过程的自动化工具。它支持自动分割大文件、增量更新，以及为 OpenAI 模型、API 代理和温度提供定制选项的功能。
- [💌 Lobe Commit][lobe-commit] : Lobe Commit 是一个 CLI 工具，它利用 Langchain/ChatGPT 生成基于 Gitmoji 的提交消息。

### 参考

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
