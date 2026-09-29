import { useTheme } from 'antd-style';
import { readableColor } from 'polished';
import { type CSSProperties, memo, useId } from 'react';

import { selectors, useAppStore } from '@/store';

export interface MarkLogoProps {
  size?: number;
  style?: CSSProperties;
  /** 'mark': icon and name; 'wordmark': the name alone, in a gradient; 'icon': the icon alone. */
  type: 'mark' | 'wordmark' | 'icon';
}

const NAME = 'Stable Diffusion';

/**
 * Built-in logos in the theme's primary colour: a mark (a gradient tile with
 * a four-point spark, the shape of a diffusion step) and a wordmark.
 */
const MarkLogo = memo<MarkLogoProps>(({ size = 32, style, type }) => {
  const theme = useTheme();
  const corner = useAppStore(selectors.currentSetting).cornerStyle;
  const id = useId().replaceAll(':', '');
  const from = theme.colorPrimary;
  const to = theme.colorPrimaryActive || theme.colorPrimaryHover;
  const r = corner === 'sharp' ? 0 : corner === 'round' ? 10 : 7;

  const text = (
    <span
      style={{
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        backgroundImage: type === 'wordmark' ? `linear-gradient(100deg, ${theme.colorText} 20%, ${from})` : undefined,
        color: type === 'wordmark' ? 'transparent' : theme.colorText,
        fontSize: size * (type === 'wordmark' ? 0.62 : 0.56),
        fontWeight: 700,
        letterSpacing: '-0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      {NAME}
    </span>
  );

  if (type === 'wordmark') return <span style={{ alignItems: 'center', display: 'flex', ...style }}>{text}</span>;

  return (
    <span style={{ alignItems: 'center', display: 'flex', gap: size * 0.3, ...style }}>
      <svg height={size} viewBox="0 0 32 32" width={size}>
        <defs>
          <linearGradient id={`g${id}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        </defs>
        <rect fill={`url(#g${id})`} height="32" rx={r} width="32" />
        <path
          d="M16 5.5c.9 5.6 4.9 9.6 10.5 10.5-5.6.9-9.6 4.9-10.5 10.5-.9-5.6-4.9-9.6-10.5-10.5C11.1 15.1 15.1 11.1 16 5.5Z"
          fill={readableColor(from, '#111', '#fff', false)}
          opacity="0.92"
        />
      </svg>
      {type === 'mark' && text}
    </span>
  );
});

export default MarkLogo;
