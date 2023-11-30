<a name="readme-top"></a>

<div align="center">

<img height="160" src="https://registry.npmmirror.com/@lobehub/assets-logo/1.0.0/files/assets/logo-3d.webp">

<h1 align="center">Lobe Theme</h1>

Stable Diffusion WebUI 现代化界面框架<br/>具有精致的界面设计，高度可定制的用户界面和提高效率的功能

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

- [📦 插件安装](#-插件安装)
- [✨ 特性一览](#-特性一览)
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

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📦 插件安装

> \[!IMPORTANT]
>
> 安装插件前，请检查 Stable Diffusion WebUI 版本环境，最低要求 `gradio-3.41.2` & `sd-webui 1.6`

#### `A` 通过 SD WebUI 插件市场安装

在 Stable Diffusion WebUI 中，您可以通过内置的插件市场来安装 Lobe Theme 插件。

- 首先，打开 Stable Diffusion WebUI，并进入插件市场。在搜索框中输入 "Lobe Theme"，然后点击搜索按钮。您将看到相关的插件列表。
- 找到 Lobe Theme 插件后，点击安装按钮。系统将开始下载并安装插件。安装完成后，您可以在插件列表中找到 Lobe Theme，重载 UI 后即可生效。

<br/>

#### `B` 通过 Git 克隆本仓库（推荐）

如果您更喜欢使用 Git 来管理插件，您可以将存储库克隆到您的扩展文件夹中。以下是详细的步骤：

- 打开命令行界面，并导航到 Stable Diffusion WebUI 根目录。
- 在命令行中运行以下命令来克隆存储库：

```shell
git clone "https://github.com/lobehub/sd-webui-lobe-theme" extensions/lobe-theme
```

- 一旦您完成了这些步骤，Lobe Theme 插件就会被成功安装到 Stable Diffusion WebUI 中

<br/>

#### 保持更新

> \[!TIP]
>
> 收藏项目，你将从 GitHub 上无延迟地接收所有发布通知～⭐️

<details><summary><kbd>Star History</kbd></summary>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=lobehub%2Fsd-webui-lobe-theme&theme=dark&type=Date">
    <img src="https://api.star-history.com/svg?repos=lobehub%2Fsd-webui-lobe-theme&type=Date">
  </picture>
</details>

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## ✨ 特性一览

![][feat-thememode]

#### `1` 亮暗色主题

当前主题设计提供了两种视觉效果：亮色主题与暗色主题，满足用户在不同光线环境下的视觉舒适度需求，可在右上角导航栏快速切换。若您倾向于默认启用暗色主题，可通过启动参数 `--theme=dark` 来实现。

> \[!TIP]
>
> 在启动文件中强制启用某颜色主题，例如在 Windows 系统中想要默认启用暗色模式，可在 `webui-user.bat` 文件添加以下内容：

```shell
set COMMANDLINE_ARGS= --theme=dark
```

此外，亦可通过 URL 参数的方式直接进行主题切换：

```shell
http://localhost:7860/?__theme=light
http://localhost:7860/?__theme=dark
```

通过这些简洁直观的操作，用户能够根据个人偏好或当前环境，快速切换界面主题，以获得最佳的使用体验。

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-theme-modify]

#### `2` 个性化主题定制

作为设计工程师出身 LobeChat 在界面设计上十分考虑用户的个性化体验，因此引入了灵活多变的主题模式，
提供了一系列的颜色定制选项，允许用户根据自己的喜好来调整应用的主题色彩。无论是想要沉稳的深蓝，
还是希望活泼的桃粉，或者是专业的灰白，用户都能够在 LobeTheme 中找到匹配自己风格的颜色选择。

> \[!TIP]
>
> 通过点击页面右上角的 `⚙` 设置图标，您可以进入设置面板进行个性化定制。
>
> - **主题色 (Primary color)**：我们提供了 `13` 种精选的主题配色方案，以满足您的个性化色彩需求。
> - **中性色 (Neutral color)**：为了更细致地调整视觉体验，您还可以选择 `6` 种不同的中性色灰阶搭配。
> - **徽标样式 (Logo type)**：您可以选择默认的 `Lobe` 和 `Kitchen` 徽标，或者进行自定义。
> - **徽标定制 (Logo customization)**：支持输入 `img url`、`base64` 编码图像或 `emoji` 表情符号来自定义徽标。填入单个 `emoji` 时，系统将自动转换为 3D Fluent Emoji，丰富视觉效果。
> - **站点标题 (Title customization)**：允许您根据需求自定义网站的标题名称。

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-highlight]

#### `3` Prompt 语法高亮

在使用 Stable Diffusion 模型进行 Promot 编写时，一个有效的功能是 Prompt 语法高亮。
这一功能通过按照预设的语法规则自动为输入的 Prompt 文本添加颜色编码，从而增强用户体验和操作的直观性。
Prompt 语法高亮不仅可以帮助用户更清晰地识别和构造语法结构，而且还能提升文本编辑和调试的效率。

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-sidebar]

#### `4` 侧边栏定制

LobeTheme 的核心亮点之一莫过于其提供的高度定制化侧边栏功能，旨在让生成图片工作流程更加顺畅，
从而确保每位用户都能根据自己的偏好来调整和优化其工作空间。

> \[!TIP]
>
> 通过点击界面右上角的 `⚙` 设置图标，您可以轻松访问和调整以下设置项：
>
> - **输入区域**
>   - 显示模式：`滚动固定高度` | `根据文本行数调整大小`
> - **侧边栏配置**
>   - 默认是否展开：`true（是）`
>   - 显示模式：`固定` | `悬浮`
>   - 默认宽度：`280像素`
> - **额外网络侧边栏**
>   - 是否启用：`true（是）`
>   - 默认是否展开：`true（是）`
>   - 显示模式：`固定` | `悬浮`
>   - 默认宽度：`340像素`
>   - 模型卡片默认尺寸：`86像素`

<details>
<summary><kbd>推荐系统设置</kbd></summary>

**Extra-Networks 扩展模型视窗**

- 拇指视图
- 卡牌宽度: 86
- 卡牌高度: 128

**Quick-Setting 快捷设置**

```txt
sd_model_checkpoint, sd_vae, CLIP_stop_at_last_layers, img2img_background_color, img2img_color_correction, samples_save, samples_format, grid_save, return_grid,  n_rows, live_previews_enable, show_progress_every_n_steps, live_preview_refresh_period
```

</details>

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-generation-info]

#### `5` 更好的图片信息展示

改进了生成信息的显示，对数据展现机制进行了深度优化，引入了 “一键复制” 功能，提高了信息索引效率。
比如现在你无需在冗长的字符串中进行繁琐搜索，即可迅速获取所需的 Seeds。

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-share]

#### `6` 图片配方分享

推出了全新的图片分享功能。通过简单的一键操作，可以轻松分享当前图像配方，制作精美的分享图，
并且还增添了更多可定制的设置选项以供探索，从而让分享图更加个性化。

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-prompt-editor]

#### `7` Prompt 提词器

在快速设置菜单的第二个选项卡中，新增了一个直观易用的提示词编辑器。
它包括了一系列预设的标签，涵盖后期处理、风格描述等关键词，以简化您的操作流程，并帮助更高效地编辑和管理提示词。

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-mobile-friendly]

#### `8` 移动端适配

为了提升移动端用户的交互体验，LobeTheme 实现了面包屑导航的智能折叠机制以及对侧边栏的精细适配。
这些调整旨在为提供便捷而直观的导航体验，无论在何种设备上。然而，在移动端实现与桌面端相同的复杂功能和细节定制存在一定的挑战。
尤其是在对接 Stable Diffusion WebUI 界面时，复杂度和参数设定的精确性要求较高，这可能会导致移动端用户的使用体验与桌面端存在一定的差异。
如果有任何建议或想法，非常欢迎通过 GitHub Issues 或者 Pull Requests 提供反馈。

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-pwa]

#### `9` PWA 渐进式 Web 应用

在当今多设备环境下为用户提供无缝体验的重要性。为此，我们采用了渐进式 Web 应用 [PWA](https://support.google.com/chrome/answer/9658361) 技术，
这是一种能够将网页应用提升至接近原生应用体验的现代 Web 技术。通过 PWA，LobeTheme 能够在桌面和移动设备上提供高度优化的用户体验，同时保持轻量级和高性能的特点。
在视觉和感觉上，也经过精心设计，以确保它的界面与原生应用无差别，提供流畅的动画、响应式布局和适配不同设备的屏幕分辨率。

> \[!NOTE]
>
> 若您未熟悉 PWA 的安装过程，您可以按照以下步骤将 LobeChat 添加为您的桌面应用（也适用于移动设备）：
>
> - 在电脑上运行 Chrome 或 Edge 浏览器 .
> - 访问 LobeChat 网页 .
> - 在地址栏的右上角，单击 <kbd>安装</kbd> 图标 .
> - 根据屏幕上的指示完成 PWA 的安装 .

<div align="right">

[![][back-to-top]](#readme-top)

</div>

#### `10` 提示词格式化

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

#### 更多特性

- [x] 💎 **精致 UI 设计**：经过精心设计的界面，具有优雅的外观和流畅的交互效果。
- [x] 🖼️ **多种布局模式**：在双列模式中，实现可调节画板比例，使生成图像始终置顶。
- [x] 🌍 **国际化支持**: 完整支持主要 i18n 语种，并欢迎提交 [PR](https://github.com/lobehub/sd-webui-lobe-theme/tree/main/locales) 贡献。

> ✨ 随着产品迭代持续更新，希望带来更多更多令人激动的功能！

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
[feat-generation-info]: https://gw.alipayobjects.com/zos/kitchen/rIv%24%24AAE6A/feat_generation_info.webp
[feat-highlight]: https://gw.alipayobjects.com/zos/kitchen/iD%24W4U2y3Y/feat_highlight.webp
[feat-mobile-friendly]: https://gw.alipayobjects.com/zos/kitchen/WpWe6Hw8UT/feat_mobile_friendly.webp
[feat-prompt-editor]: https://gw.alipayobjects.com/zos/kitchen/FrA0mjmNv7/feat_prompt_editor.webp
[feat-pwa]: https://gw.alipayobjects.com/zos/kitchen/az49akOKJT/feat_pwa.webp
[feat-share]: https://gw.alipayobjects.com/zos/kitchen/h4QrGbJ9dF/feat_share.webp
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
