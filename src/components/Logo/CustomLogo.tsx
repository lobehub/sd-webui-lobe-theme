import { FluentEmoji, Logo as LobeLogo, getEmoji } from '@lobehub/ui';
import { Space } from 'antd';
import { type CSSProperties, memo } from 'react';

export interface CustomLogoProps {
  /** The image or emoji alone, without the title (or the title's initials when there is no image). */
  compact?: boolean;
  logoCustomTitle?: string;
  logoCustomUrl?: string;
  size?: number;
  style?: CSSProperties;
}

const CustomLogo = memo<CustomLogoProps>(({ compact, size = 32, style, logoCustomUrl, logoCustomTitle }) => {
  let customLogo = <LobeLogo size={size} style={style} />;
  let hasImage = false;

  if (logoCustomUrl) {
    if (logoCustomUrl.includes('http') || logoCustomUrl.includes('data')) {
      customLogo = <img alt="logo" src={logoCustomUrl} style={{ height: size, maxWidth: compact ? size : undefined, objectFit: 'contain', ...style }} />;
      hasImage = true;
    } else {
      const pureEmoji = getEmoji(logoCustomUrl);
      if (pureEmoji) {
        customLogo = <FluentEmoji emoji={pureEmoji} size={size} style={style} />;
        hasImage = true;
      }
    }
  }

  if (compact) {
    if (hasImage || !logoCustomTitle?.trim()) return customLogo;
    const words = logoCustomTitle.trim().split(/\s+/);
    const initials = (words.length > 1 ? words[0][0] + words[1][0] : words[0].slice(0, 2)).toUpperCase();
    return <b style={{ fontSize: size * 0.5, letterSpacing: '-0.02em', ...style }}>{initials}</b>;
  }

  return (
    <Space align="center" size={size * 0.3}>
      {customLogo}
      <b style={{ fontSize: size * 0.6, whiteSpace: 'nowrap' }}>{logoCustomTitle}</b>
    </Space>
  );
});

export default CustomLogo;
