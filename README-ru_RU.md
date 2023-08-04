<a name="readme-top"></a>

<div align="center">

<img width="160" src="https://npm.elemecdn.com/@lobehub/assets-logo@1.0.0/assets/logo-3d.webp">

<h1 align="center">Lobe Theme</h1>

Современная тема для стабильной диффузии webui

Ранее известная как Kitchen theme

[English ](./README.md)· [简体中文](./README-zh_CN.md) · Russian · [Changelog](./CHANGELOG.md) · [Report Bug][issues-url] · [Request Feature][issues-url]

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

- [✨ Дополнения](#-дополнения)
- [📦 Установка](#-установка)
- [🤯 Использование](#-использование)
- [🖥 Поддерживаемые браузеры](#-поддерживаемые-браузеры)
- [⌨️ Локальная разработка](#️-локальная-разработка)
- [🤝 Содействие](#-содействие)
- [🔗 Ссылки](#-ссылки)

####

</details>

## ✨ Дополнения

- [x] 🌗 Поддержка светлой и темной темы, с возможностью быстрого переключения на панели навигации
- [x] 🌈 Поддержка кастомных пользовательских и нейтральных цветов с возможностью настройки логотипа
- [x] 🪄 Поддержка форматирования подсказки одним щелчком мыши с помощью простого редактора тегов
- [x] 🎛️ Высоконастраиваемая боковая панель, с боковой панелью быстрых настроек слева и боковой панелью моделей справа
- [x] 🖼️ Регулируемое соотношение холста, благодаря чему генерируемые изображения всегда отображаются сверху
- [x] 📱 Mobile-friendly, с частичной оптимизацией под мобильные экраны
- [x] 🌍 Поддержка i18n(Поддержка разных языков) и приветствуются [PR](https://github.com/canisminor1990/sd-webui-lobe-theme/tree/main/locales)
- [x] 📝 Подсветка синтаксиса в поле ввода промта
- [x] 📦 Поддержка [PWA](https://support.google.com/chrome/answer/9658361)

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📦 Установка

#### Метод 1

Найдите `Lobe Theme` или `Kitchen Theme` в поисковике плагинов SD WebUI и установите их.

> 👉 Примечание: **Версия 2.0.0** была переименована в **Lobe Theme**.

#### Метод 2

В качестве расширения (рекомендуется) клонировать репозиторий в папку расширений:

```shell
git clone "https://github.com/canisminor1990/sd-webui-lobe-theme" extensions/lobe-theme
```

> 👉 Примечание: Минимальные требования gradio-3.23.0 & sd-webui [4c1ad74](https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/4c1ad743e3baf1246db0711aa0107debf036a12b)

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤯 Использование

![][feat-thememode]

#### Светлая и темная темы

> 👉 Совет: В правом верхнем углу панели навигации можно быстро переключаться между светлой и темной темами.

Текущая тема поддерживает как светлые, так и темные темы. Если вы хотите принудительно включить темный режим, используйте аргумент `--theme=dark` для запуска WebUI. Например, под Windows ваш `webui-user.bat` должен содержать:

```shell
set COMMANDLINE_ARGS= --theme=dark
```

Кроме того, переключение можно осуществлять непосредственно через URL:

```shell
http://localhost:7860/?__theme=light
http://localhost:7860/?__theme=dark
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-theme-modify]

#### Кастомизация темы

> 👉 Совет: Щелкните на значке `⚙` в правом верхнем углу, чтобы открыть панель настроек. В настоящее время доступны следующие настройки:

- Тема
  - Основной цвет: в настоящее время предлагается 13 цветовых комбинаций тем.
  - Нейтральный цвет: в настоящее время предлагается 6 различных комбинаций оттенков серого.
  - Тип логотипа: `Lobe`, `Kitchen`, `Custom`
    - Пользовательский логотип: `Поддерживаются ссылки`, `base64`, и `emoji`. При вводе одного смайлика он будет автоматически заменен на 3D Fluent Emoji.
    - Пользовательский заголовок: Настраиваемое название сайта/темы.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-highlight]

#### Подсветка синтаксиса подсказок

Автоматически подсвечивать промт в соответствии с правилами синтаксиса Stable Diffusion.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-sidebar]

#### Настройка боковой панели

> 👉 Совет: нажмите значок `⚙` в правом верхнем углу, чтобы открыть панель настроек. Текущие доступные настройки следующие:

- **Текстовое поле промта**
  - Режим отображения: `Фиксированная высота и скрол в поле ввода` | `Увеличение от вводимого текста`
- **Боковая панель**
  - По умолчанию развернуть: `true`
  - Режим отображения: `Фиксированный` | `Плавающий`
  - Ширина по умолчанию: `280`
- **Панель с дом. сетями**
  - Включено: `true`
  - По умолчанию развернуть: `true`
  - Режим отображения: `Фиксированный` | `Плавающий`
  - Ширина по умолчанию: `340`
  - Размер превью по умолчанию: `86`

<details>
<summary><kbd>Recommended System Settings</kbd></summary>

#### Доп. Сети

- Превью
- Ширина: 86
- высота: 128

<br/>

#### Быстрые настройки (изменяются в настройках SD)

```txt
sd_model_checkpoint, sd_vae, CLIP_stop_at_last_layers, img2img_background_color, img2img_color_correction, samples_save, samples_format, grid_save, return_grid,  n_rows, live_previews_enable, show_progress_every_n_steps, live_preview_refresh_period
```

</details>

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-mobile-friendly]

#### Адаптированно под мобильные устройства

Выполнена частичная адаптация удобства работы с мобильными устройствами, включая откидную панель навигации, адаптацию боковой панели и т.д. Однако из-за высокой сложности и фиксированных значений стабильного диффузного интерфейса трудно обеспечить такое же удобство работы, как и в настольной версии. Приветствуется обратная связь для поиска новых идей.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

![][feat-pwa]

#### Progress Web App

Вы можете использовать Progressive Web Apps [PWA](https://support.google.com/chrome/answer/9658361) для быстрого стабильного запуска на компьютере или мобильном устройстве.

- На компьютере откройте браузер Chrome.
- Перейдите на стабильный сайт диффузии, который вы хотите установить
- В правом верхнем углу адресной строки нажмите кнопку `Установить`
- Follow the onscreen instructions to install the PWA

<div align="right">

[![][back-to-top]](#readme-top)

</div>

#### Форматирование подсказок

Нажмите кнопку <kbd>🪄</kbd> под строкой Prompt, чтобы отформатировать слова подсказки одним щелчком мыши.

> 👉 Совет: Преобразует полноразмерные знаки препинания в полуразмерные, уберет лишние пробелы, добавит недостающие запятые и перенесёт в конец Extra-Networks (Дополнительные) модели.

Перед форматированием:

```text
photorealistic   photo of a handsome male (wizard  :1.2）， <lora:LuisapHotlineStyle:0.5> <lora:ElegantHanfuRuqunStyle:0.2>    short beard, white wizard  shirt, (with golden    trim:0.8),
```

После форматирования:

```text
photorealistic photo of a handsome male, (wizard:1.2), short beard, white wizard shirt, (with golden trim:0.8), <lora:LuisapHotlineStyle:0.5>, <lora:ElegantHanfuRuqunStyle:0.2>
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🖥 Поддерживаемые браузеры

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| last 2 versions                                                                                                                                                                                              | last 2 versions                                                                                                                                                                                      | last 2 versions                                                                                                                                                                                              |

> ⚠️ В настоящее время известна проблема совместимости со стилями в браузере Firefox.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## ⌨️ Локальная разработка

Вы можете использовать Gitpod для разработки в режиме онлайн:

[Open in Gitpod][gitpod-url]

В качестве альтернативы можно клонировать его для локальной разработки. Для включения режима горячей загрузки необходимо предварительно запустить Stable-Diffusion на порту `7860`.

```bash
$ git clone https://github.com/canisminor1990/sd-webui-lobe-theme.git
$ cd sd-webui-lobe-theme
$ pnpm install
$ pnpm start
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤝 Содействие

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

## 🔗 Ссылки

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
