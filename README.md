<a name="readme-top"></a>

<div align="center">

<img height="120" src="https://registry.npmmirror.com/@lobehub/assets-logo/1.0.0/files/assets/logo-3d.webp">
<img height="120" src="https://gw.alipayobjects.com/zos/kitchen/qJ3l3EPsdW/split.svg">
<img height="120" src="https://registry.npmmirror.com/@lobehub/assets-emoji/1.3.0/files/assets/a-button.webp">

<h1 align="center">Lobe Theme</h1>

A modern interface framework designed for Stable Diffusion WebUI<br/>with an exquisite interface design, a highly customizable UI, and efficiency-boosting features.

English · [简体中文](./README.zh-CN.md) · [Changelog](./CHANGELOG.md) · [Report Bug][github-issues-link] · [Request Feature][github-issues-link]

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
[![][github-license-shield]][github-license-link]<br>
[![][sponsor-shield]][sponsor-link]

</div>

![][cover]

> \[!WARNING]
>
> `Lobe Theme v3` is compatible with `SD WebUI v1.6` and is not backwards compatible. Versions below `< 1.6` should be moved to the branch [legacy-sd-webui-1.5](https://github.com/lobehub/sd-webui-lobe-theme/tree/legacy-sd-webui-1.5)

<details>
<summary><kbd>Table of contents</kbd></summary>

#### TOC

- [👋🏻 Getting Started & Join Our Community](#-getting-started--join-our-community)
- [📦 Extension Installation](#-extension-installation)
- [✨ Feature Overview](#-feature-overview)
- [🖥 Environment Support](#-environment-support)
- [📦 Ecosystem](#-ecosystem)
- [⌨️ Local Development](#️-local-development)
- [🤝 Contributing](#-contributing)
- [🩷 Sponsor](#-sponsor)
- [🔗 Links](#-links)
  - [More Products](#more-products)
  - [Credits](#credits)

####

</details>

## 👋🏻 Getting Started & Join Our Community

Please be aware that LobeTheme is currently under active development, and feedback is welcome for any [issues][github-issues-link] encountered.

| [![][discord-shield-badge]][discord-link] | Join our Discord community! This is where you can connect with developers and other enthusiastic users of LobeHub. |
| :---------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |

> \[!IMPORTANT]
>
> **Star Us**, You will receive all release notifications from GitHub without any delay \~ ⭐️

<details><summary><kbd>Star History</kbd></summary>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=lobehub%2Fsd-webui-lobe-theme&theme=dark&type=Date">
    <img src="https://api.star-history.com/svg?repos=lobehub%2Fsd-webui-lobe-theme&type=Date">
  </picture>
</details>

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📦 Extension Installation

> \[!NOTE]
>
> Before installing the extension, please check the environment version of Stable Diffusion WebUI, with a minimum requirement of `gradio-3.41.2` & `sd-webui 1.6`

#### `A` Installation via SD WebUI Extension Market

In Stable Diffusion WebUI, you can install the Lobe Theme extension through the built-in extension market.

- First, open Stable Diffusion WebUI and go to the extension market. Enter "Lobe Theme" in the search box and click the search button. You will see a list of related extensions.
- After finding the Lobe Theme extension, click the install button. The system will start downloading and installing the extension. After installation, you can find the Lobe Theme in the extension list, and it will take effect after reloading the UI.

#### `B` Clone this Repository via Git (Recommended)

If you prefer to manage extensions using Git, you can clone the repository to your extensions folder. Here are the detailed steps:

- Open the command line interface and navigate to the root directory of Stable Diffusion WebUI.
- Run the following command in the command line to clone the repository:

```shell
git clone "https://github.com/lobehub/sd-webui-lobe-theme" extensions/lobe-theme
```

> Once you have completed these steps, the Lobe Theme extension will be successfully installed in Stable Diffusion WebUI.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## ✨ Feature Overview

![][feat-thememode]

#### `1` Light & Dark Theme

The current theme design provides two visual effects: light theme and dark theme,
to meet the visual comfort needs of users in different lighting environments,
which can be quickly switched in the upper right corner of the navigation bar.

If you prefer to default to the dark theme, you can achieve this by using the startup parameter `--theme=dark`.

> \[!TIP]
>
> To force a certain color theme in the startup file, for example, if you want to default to the dark mode in the Windows system, you can add the following content to the `webui-user.bat` file:

```shell
set COMMANDLINE_ARGS= --theme=dark
```

In addition, you can also directly switch the theme through URL parameters:

```shell
http://localhost:7860/?__theme=light
http://localhost:7860/?__theme=dark
```

Through these simple and intuitive operations,
users can quickly switch the interface theme according to their personal preferences or current environment,
in order to achieve the best user experience.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-theme-modify]

#### `2` Personalized Theme Customization

As a design engineer, LobeChat considers the personalized experience of users in interface design,
and has introduced a flexible and changeable theme mode, providing a series of color customization options,
allowing users to adjust the theme color of the application according to their preferences.

Whether you want a stable deep blue, a lively peach pink, or a professional gray and white,
users can find color options that match their style in LobeTheme.

> \[!TIP]
>
> By clicking the gear icon in the upper right corner of the page, you can enter the settings panel for personalized customization.
>
> - **Primary Color**: We provide `13` carefully selected theme color schemes to meet your personalized color needs.
> - **Neutral Color**: For a more detailed adjustment of the visual experience, you can also choose from `6` different neutral gray levels.
> - **Logo Type**: You can choose the default `Lobe` and `Kitchen` logos, or customize them.
> - **Logo Customization**: Support inputting `img url`, `base64` encoded images, or `emoji` emoticons for logo customization. When entering a single `emoji`, the system will automatically convert it into a 3D Fluent Emoji, enriching the visual effect.
> - **Site Title Customization**: Allows you to customize the title of the website according to your needs.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-highlight]

#### `3` Prompt Syntax Highlighting

When using the Stable Diffusion model for Prompt writing,
an effective feature is the Prompt syntax highlighting.

This feature automatically adds color coding to the input Prompt text according to preset syntax rules,
enhancing the user experience and the intuitiveness of operations.
Prompt syntax highlighting can not only help users identify and construct syntax structures more clearly,
but also improve the efficiency of text editing and debugging.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-sidebar]

#### `4` Customizable Sidebar

One of the key highlights of LobeTheme is its highly customizable sidebar feature,
designed to make the image generation workflow smoother,
ensuring that every user can adjust and optimize their workspace according to their preferences.

> \[!TIP]
>
> By clicking the gear icon in the upper right corner of the interface, you can easily access and adjust the following settings:
>
> - **Input Area**
>   - Display Mode: `Scroll Fixed Height` | `Adjust Size According to Text Lines`
> - **Sidebar Configuration**
>   - Default Expansion: `true`
>   - Display Mode: `Fixed` | `Floating`
>   - Default Width: `280 pixels`
> - **Extra Network Sidebar**
>   - Enable: `true`
>   - Default Expansion: `true`
>   - Display Mode: `Fixed` | `Floating`
>   - Default Width: `340 pixels`
>   - Model Card Default Size: `86 pixels`

<details>
<summary><kbd>Recommended System Settings</kbd></summary>

**Extra-Networks Extension Model Window**

- Thumbnail View
- Card Width: 86
- Card Height: 128

**Quick-Setting**

```txt
sd_model_checkpoint, sd_vae, CLIP_stop_at_last_layers, img2img_background_color, img2img_color_correction, samples_save, samples_format, grid_save, return_grid,  n_rows, live_previews_enable, show_progress_every_n_steps, live_preview_refresh_period
```

</details>

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-generation-info]

#### `5` Improved Image Information Display

The display of generation information has been improved,
with a deep optimization of the data presentation mechanism,
and the introduction of a "one-click copy" function to improve information retrieval efficiency.

Now, you can quickly obtain the required Seeds without tedious searching in long strings.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-share]

#### `6` Image Recipe Sharing

A brand-new image sharing feature has been launched.
With a simple one-click operation, you can easily share the current image recipe,
create exquisite shared images, and explore more customizable settings to make the shared images more personalized.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-prompt-editor]

#### `7` Prompt Editor

A user-friendly prompt word editor has been added to the second tab of the quick setting menu.
It includes a series of preset tags covering post-processing, style description, and other key words,
simplifying your operation process and helping you edit and manage prompts more efficiently.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-mobile-friendly]

#### `8` Mobile-Friendly Adaptation

In order to improve the interactive experience of mobile users,
LobeTheme has implemented an intelligent folding mechanism for breadcrumb navigation and finely adapted the sidebar.
These adjustments are aimed at providing convenient and intuitive navigation experience on any device.

However, achieving the same complex functions and detailed customization as the desktop on the mobile end poses certain challenges.
Especially when integrating with the Stable Diffusion WebUI interface, high complexity and precise parameter settings are required,
which may result in differences in user experience between mobile and desktop.

If you have any suggestions or ideas, please feel free to provide feedback through GitHub Issues or Pull Requests.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-pwa]

#### `9` PWA Progressive Web Application

In today's multi-device environment, providing a seamless experience for users is crucial.
Therefore, we have adopted the Progressive Web Application [PWA](https://support.google.com/chrome/answer/9658361) technology,
which is a modern web technology that can elevate web applications to a near-native application experience.

Through PWA, LobeTheme can provide a highly optimized user experience on desktop and mobile devices,
while maintaining lightweight and high performance characteristics. Visually and perceptually,
it has been carefully designed to ensure that its interface is indistinguishable from native applications,
providing smooth animations, responsive layout, and adaptation to different screen resolutions of different devices.

> \[!NOTE]
>
> If you are not familiar with the installation process of PWA, you can follow these steps to add LobeChat as your desktop application (also applicable to mobile devices):
>
> - Run the Chrome or Edge browser on your computer.
> - Visit the LobeChat website.
> - Click the <kbd>Install</kbd> icon in the upper right corner of the address bar.
> - Follow the on-screen instructions to complete the installation of PWA.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

#### `10` Prompt Word Formatting

Click the <kbd>🪄</kbd> button below the Prompt to format the prompt words with one click.

> \[!TIP]
>
> Convert full-width punctuation to half-width, remove extra spaces, add missing commas, and move the Extra-Networks model to the end.

Before formatting

```text
photorealistic   photo of a handsome male (wizard  :1.2）， <lora:LuisapHotlineStyle:0.5> <lora:ElegantHanfuRuqunStyle:0.2>    short beard, white wizard  shirt, (with golden    trim:0.8),
```

After formatting

```text
photorealistic photo of a handsome male, (wizard:1.2), short beard, white wizard shirt, (with golden trim:0.8), <lora:LuisapHotlineStyle:0.5>, <lora:ElegantHanfuRuqunStyle:0.2>
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

#### More Features

- [x] 💎 **Exquisite UI Design**: Carefully designed interface with elegant appearance and smooth interactive effects.
- [x] 🖼️ **Multiple Layout Modes**: In the dual-column mode, it achieves adjustable canvas proportions, ensuring that the generated images are always on top.
- [x] 🌍 **Internationalization Support**: Fully supports major i18n languages and welcomes contributions on [PR](https://github.com/lobehub/sd-webui-lobe-theme/tree/main/locales).

> ✨ With continuous updates in product iterations, we hope to bring more exciting features!

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🖥 Environment Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| last 2 versions                                                                                                                                                                                              | last 2 versions                                                                                                                                                                                      | last 2 versions                                                                                                                                                                                              |

> \[!CAUTION]
>
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

Contributions of all types are more than welcome, if you are interested in contributing code, feel free to check out our GitHub [Issues][github-issues-link] to get stuck in to show us what you’re made of.

[![][pr-welcome-shield]][pr-welcome-link]

<a href="https://github.com/lobehub/sd-webui-lobe-theme/graphs/contributors" target="_blank">
  <table>
    <tr>
      <th colspan="2">
        <br><img src="https://contrib.rocks/image?repo=lobehub/sd-webui-lobe-theme"><br><br>
      </th>
    </tr>
    <tr>
      <td>
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://next.ossinsight.io/widgets/official/compose-org-active-contributors/thumbnail.png?activity=active&period=past_90_days&owner_id=131470832&repo_ids=606329910&image_size=2x3&color_scheme=dark">
          <img src="https://next.ossinsight.io/widgets/official/compose-org-active-contributors/thumbnail.png?activity=active&period=past_90_days&owner_id=131470832&repo_ids=606329910&image_size=2x3&color_scheme=light">
        </picture>
      </td>
      <td rowspan="2">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://next.ossinsight.io/widgets/official/compose-org-participants-growth/thumbnail.png?activity=active&period=past_90_days&owner_id=131470832&repo_ids=606329910&image_size=4x7&color_scheme=dark">
          <img src="https://next.ossinsight.io/widgets/official/compose-org-participants-growth/thumbnail.png?activity=active&period=past_90_days&owner_id=131470832&repo_ids=606329910&image_size=4x7&color_scheme=light">
        </picture>
      </td>
    </tr>
    <tr>
      <td>
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://next.ossinsight.io/widgets/official/compose-org-active-contributors/thumbnail.png?activity=new&period=past_90_days&owner_id=131470832&repo_ids=606329910&image_size=2x3&color_scheme=dark">
          <img src="https://next.ossinsight.io/widgets/official/compose-org-active-contributors/thumbnail.png?activity=new&period=past_90_days&owner_id=131470832&repo_ids=606329910&image_size=2x3&color_scheme=light">
        </picture>
      </td>
    </tr>
  </table>
</a>

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🩷 Sponsor

Every bit counts and your one-time donation sparkles in our galaxy of support! You're a shooting star, making a swift and bright impact on our journey. Thank you for believing in us – your generosity guides us toward our mission, one brilliant flash at a time.

<a href="https://opencollective.com/lobehub" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/lobehub/.github/blob/main/static/sponsor-dark.png?raw=true">
    <img  src="https://github.com/lobehub/.github/blob/main/static/sponsor-light.png?raw=true">
  </picture>
</a>

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

Copyright © 2023 [LobeHub][profile-link]. <br />
This project is [AGPL3](./LICENSE) licensed.

<!-- LINK GROUP -->

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square
[bun-link]: https://bun.sh
[bun-shield]: https://img.shields.io/badge/-speedup%20with%20bun-black?logo=bun&style=for-the-badge
[codespaces-link]: https://codespaces.new/lobehub/sd-webui-lobe-theme
[codespaces-shield]: https://github.com/codespaces/badge.svg
[cover]: https://gw.alipayobjects.com/zos/kitchen/8Ab%24hLJ5ur/cover.webp
[discord-link]: https://discord.gg/AYFPHvv2jT
[discord-shield]: https://img.shields.io/discord/1127171173982154893?color=5865F2&label=discord&labelColor=black&logo=discord&logoColor=white&style=flat-square
[discord-shield-badge]: https://img.shields.io/discord/1127171173982154893?color=5865F2&label=discord&labelColor=black&logo=discord&logoColor=white&style=for-the-badge
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
[profile-link]: https://github.com/lobehub
[sponsor-link]: https://opencollective.com/lobehub 'Become 🩷 LobeHub Sponsor'
[sponsor-shield]: https://img.shields.io/badge/-Sponsor%20LobeHub-f04f88?logo=opencollective&logoColor=white&style=flat-square
