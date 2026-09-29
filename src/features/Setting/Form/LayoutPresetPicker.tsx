import { createStyles } from 'antd-style';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import type { WebuiSetting } from '@/store';

type Preset = WebuiSetting['layoutPreset'];

const useStyles = createStyles(({ css, token }) => ({
  card: css`
    cursor: pointer;

    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: center;

    flex: none;

    width: 100px !important;
    min-width: 0 !important;
    height: auto !important;
    padding: 6px !important;

    text-align: start;

    background: ${token.colorFillQuaternary};
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadiusLG}px;

    transition: border-color 150ms ${token.motionEaseOut};

    &:hover {
      border-color: ${token.colorBorder};
    }
  `,
  active: css`
    border-color: ${token.colorPrimary} !important;
    box-shadow: 0 0 0 1px ${token.colorPrimary};
  `,
  label: css`
    font-size: 12px;
    text-align: center;
    font-weight: 600;
    color: ${token.colorText};
  `,
  desc: css`
    font-size: 12px;
    line-height: 1.4;
    color: ${token.colorTextDescription};
    text-align: end;
  `,
  list: css`
    display: flex;
    flex-wrap: nowrap;
    gap: 8px;
    justify-content: flex-end;
  `,
  wrap: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-end;

    max-width: 330px;
  `,
  svg: css`
    display: block;
    width: 100%;
    height: auto;
    border-radius: ${token.borderRadius}px;
  `,
}));

/**
 * A small picture of each layout: the blocks where they go. Coloured blocks are
 * the prompt / settings column, the result and the sidebars.
 */
const Thumb = memo<{ preset: Preset }>(({ preset }) => {
  const { styles, theme } = useStyles();
  const bg = theme.colorBgLayout;
  const block = theme.colorFillSecondary;
  const strong = theme.colorPrimary;
  const soft = theme.colorFillTertiary;
  const result = theme.colorFill;

  if (preset === 'classic') {
    return (
      <svg className={styles.svg} viewBox="0 0 152 96">
        <rect fill={bg} height="96" width="152" />
        <rect fill={block} height="8" rx="2" width="144" x="4" y="4" />
        <rect fill={soft} height="76" rx="2" width="22" x="4" y="16" />
        <rect fill={strong} height="18" opacity="0.8" rx="2" width="92" x="30" y="16" />
        <rect fill={block} height="54" rx="2" width="44" x="30" y="38" />
        <rect fill={result} height="54" rx="2" width="44" x="78" y="38" />
        <rect fill={soft} height="76" rx="2" width="22" x="126" y="16" />
      </svg>
    );
  }
  const mirror = preset === 'studioMirror';
  const left = mirror ? 70 : 20;
  const right = mirror ? 20 : 70;
  return (
    <svg className={styles.svg} viewBox="0 0 152 96">
      <rect fill={bg} height="96" width="152" />
      <rect fill={block} height="88" rx="2" width="10" x="4" y="4" />
      <g transform={`translate(${left} 0)`}>
        <rect fill={block} height="8" rx="2" width="46" x="0" y="4" />
        <rect fill={strong} height="76" opacity="0.8" rx="2" width="46" x="0" y="16" />
      </g>
      <rect fill={result} height="88" rx="2" width="46" x={right} y="4" />
      <rect fill={soft} height="88" rx="2" width="28" x="120" y="4" />
    </svg>
  );
});

interface LayoutPresetPickerProps {
  onChange?: (value: Preset) => void;
  value?: Preset;
}

const PRESETS: Preset[] = ['classic', 'studio', 'studioMirror'];

const LayoutPresetPicker = memo<LayoutPresetPickerProps>(({ value = 'classic', onChange }) => {
  const { styles, cx } = useStyles();
  const { t } = useTranslation();
  return (
    <div className={styles.wrap}>
      <div className={styles.list} role="radiogroup">
        {PRESETS.map((preset) => (
          <button
            aria-checked={value === preset}
            className={cx(styles.card, value === preset && styles.active)}
            key={preset}
            onClick={() => onChange?.(preset)}
            role="radio"
            title={t(`setting.layoutPreset.${preset}.desc` as any) as string}
            type="button"
          >
            <Thumb preset={preset} />
            <span className={styles.label}>{t(`setting.layoutPreset.${preset}.title` as any) as string}</span>
          </button>
        ))}
      </div>
      <span className={styles.desc}>{t(`setting.layoutPreset.${value}.desc` as any) as string}</span>
    </div>
  );
});

export default LayoutPresetPicker;
