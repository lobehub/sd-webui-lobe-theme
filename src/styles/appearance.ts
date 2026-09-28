/**
 * Appearance options: corner style, density, fonts and surface style.
 *
 * Most of it is antd tokens (radius, control height, padding, font), handed
 * to a nested antd ConfigProvider in the global layout. The WebUI's own
 * Gradio variables are generated from the same tokens (styles/tokens.ts), so
 * Gradio blocks follow. What tokens cannot reach (hard-coded radii of Gradio
 * and extension widgets, glass panels) is CSS keyed on body classes.
 */
import { css } from 'antd-style';

import type { WebuiSetting } from '@/store';

export type CornerStyle = 'sharp' | 'soft' | 'round';
export type Density = 'comfortable' | 'compact';
export type SurfaceStyle = 'flat' | 'glass' | 'elevated';

interface FontDef {
  /** Folder under assets/fonts (bundled, OFL); undefined for system/default. */
  dir?: string;
  /** CSS family name, undefined = the theme's default stack. */
  family?: string;
  label: string;
}

const EMOJI = '"Segoe UI Emoji","Segoe UI Symbol","Apple Color Emoji","Noto Color Emoji"';
const SYSTEM =
  'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",Ubuntu,Cantarell,sans-serif';
const MONO_FALLBACK = 'ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace';

// Lists, not objects: the order is the order of the menu.
const FONT_LIST: [string, FontDef][] = [
  ['harmony', { label: 'HarmonyOS Sans' }],
  ['inter', { dir: 'inter', family: "'Inter Variable'", label: 'Inter' }],
  ['geist', { dir: 'geist', family: "'Geist Variable'", label: 'Geist' }],
  ['manrope', { dir: 'manrope', family: "'Manrope Variable'", label: 'Manrope' }],
  ['beVietnam', { dir: 'be-vietnam-pro', family: "'Be Vietnam Pro'", label: 'Be Vietnam Pro' }],
  ['system', { family: SYSTEM, label: 'System' }],
];

const MONO_FONT_LIST: [string, FontDef][] = [
  ['harmony', { label: 'Hack' }],
  ['geistMono', { dir: 'geist-mono', family: "'Geist Mono Variable'", label: 'Geist Mono' }],
  ['jetbrains', { dir: 'jetbrains-mono', family: "'JetBrains Mono Variable'", label: 'JetBrains Mono' }],
  ['system', { family: MONO_FALLBACK, label: 'System' }],
];

export const FONTS: Record<string, FontDef> = Object.fromEntries(FONT_LIST);
export const MONO_FONTS: Record<string, FontDef> = Object.fromEntries(MONO_FONT_LIST);
export const fontOptions = (mono: boolean) => (mono ? MONO_FONT_LIST : FONT_LIST);

const RADIUS: Record<CornerStyle, Record<string, number>> = {
  round: { borderRadius: 10, borderRadiusLG: 16, borderRadiusSM: 8, borderRadiusXS: 6 },
  sharp: { borderRadius: 2, borderRadiusLG: 2, borderRadiusSM: 1, borderRadiusXS: 0 },
  soft: {},
};

const DENSITY: Record<Density, Record<string, number>> = {
  comfortable: {},
  compact: {
    controlHeight: 30,
    controlHeightLG: 36,
    controlHeightSM: 24,
    margin: 12,
    marginLG: 18,
    marginSM: 8,
    marginXS: 6,
    padding: 12,
    paddingLG: 16,
    paddingMD: 14,
    paddingSM: 8,
    paddingXL: 20,
    paddingXS: 6,
  },
};

/** antd token overrides for the chosen appearance (empty = theme defaults). */
export const appearanceToken = (s: WebuiSetting) => {
  const token: Record<string, number | string> = {
    ...RADIUS[s.cornerStyle || 'soft'],
    ...DENSITY[s.density || 'comfortable'],
  };
  const font = FONTS[s.fontFamily || 'harmony'];
  if (font?.family) token.fontFamily = `${font.family},${SYSTEM},${EMOJI}`;
  const mono = MONO_FONTS[s.fontMono || 'harmony'];
  if (mono?.family) token.fontFamilyCode = `${mono.family},${MONO_FALLBACK}`;
  return token;
};

/** Stylesheets of the bundled fonts in use. */
export const appearanceFontUrls = (s: WebuiSetting) =>
  [FONTS[s.fontFamily || 'harmony'], MONO_FONTS[s.fontMono || 'harmony']]
    .filter((f) => f?.dir)
    .map((f) => `/lobe/assets/fonts/${f!.dir}/css/index.css`);

/** Body classes the CSS below keys on. */
export const appearanceClasses = (s: WebuiSetting) => [
  `lobe-corner-${s.cornerStyle || 'soft'}`,
  `lobe-density-${s.density || 'comfortable'}`,
  `lobe-surface-${s.surfaceStyle || 'flat'}`,
];

export default () => css`
  /* ---- sharp corners: everything square except what must stay round */
  body.lobe-corner-sharp
    *:not(
      .ant-switch,
      .ant-switch *,
      .ant-avatar,
      .ant-badge-dot,
      .ant-spin-dot-item,
      input[type='radio'],
      .lobe-keep-round,
      .lobe-keep-round *,
      [class*='swatch'],
      [class*='Swatch']
    ) {
    border-radius: 0 !important;
  }

  /* ---- compact: Gradio parts the tokens do not reach */
  body.lobe-density-compact {
    --layout-gap: 8px;
    --form-gap-width: 1px;
    --block-padding: 8px 10px;
    --block-label-padding: 2px 8px;
    --input-padding: 6px;
    --size-2: 6px;
    --size-4: 12px;

    .label-wrap {
      padding-block: 2px !important;

      &.open {
        padding-bottom: 8px !important;
      }
    }

    .gradio-accordion,
    .input-accordion {
      padding-block: 8px !important;
    }

    .gradio-slider input[type='number'],
    .gradio-number input {
      height: 28px;
    }

    .tab-nav button,
    .tab-wrapper button {
      padding-block: 4px !important;
    }
  }

  /* ---- glass: frosted header and side panels (fixed areas only, so the
     blur does not repaint while the page scrolls) */
  body.lobe-surface-glass {
    .layout-header,
    header[class*='header'],
    .draggable-panel,
    .draggable-panel-container {
      background: color-mix(in srgb, var(--background-fill-secondary) 62%, transparent) !important;
      backdrop-filter: blur(18px) saturate(1.4);
    }

    .gradio-accordion,
    .input-accordion,
    .gradio-group,
    .gradio-box,
    .block.padded:not(.gradio-accordion *) {
      background: color-mix(in srgb, var(--background-fill-secondary) 72%, transparent) !important;
    }
  }

  /* ---- elevated: soft layered shadows and a hairline border (bento cards) */
  body.lobe-surface-elevated {
    .gradio-accordion,
    .input-accordion,
    .gradio-group,
    #txt2img_results,
    #img2img_results,
    .gradio-box {
      border: 1px solid color-mix(in srgb, var(--body-text-color) 8%, transparent) !important;
      box-shadow:
        0 1px 2px rgb(0 0 0 / 12%),
        0 8px 24px -12px rgb(0 0 0 / 35%) !important;
    }
  }
`;
