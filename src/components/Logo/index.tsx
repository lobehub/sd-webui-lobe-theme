import { Logo as LobeLogo } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { type CSSProperties, memo } from 'react';

import { cdnUrl } from '@/app/assets';
import { GITHUB_REPO_URL } from '@/const/url';
import { selectors, useAppStore } from '@/store';

import CustomLogo from './CustomLogo';
import KitchenLogo from './KitchenLogo';
import MarkLogo from './MarkLogo';

export interface LogoProps {
  /** Only the mark, no wordmark: for narrow places such as the side rail. */
  compact?: boolean;
  size?: number;
  style?: CSSProperties;
}

const Logo = memo<LogoProps>(({ compact, size = 32, style }) => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const themeMode = useAppStore(selectors.themeMode);

  if (setting.logoType === 'kitchen') {
    // the Kitchen logo is a wordmark: in a narrow place, the theme's own mark instead
    if (compact) return <MarkLogo size={size} style={style} type="icon" />;
    return <KitchenLogo size={size * 0.75} style={style} themeMode={themeMode} />;
  }

  if (setting.logoType === 'none') return null;

  if (setting.logoType === 'mark' || setting.logoType === 'wordmark') {
    return <MarkLogo size={size} style={style} type={compact ? 'icon' : setting.logoType} />;
  }

  if (setting.logoType === 'custom') {
    return (
      <CustomLogo
        compact={compact}
        logoCustomTitle={setting.logoCustomTitle}
        logoCustomUrl={setting.logoCustomUrl}
        size={size}
        style={style}
      />
    );
  }

  if (compact) {
    // the 3D mark from the theme's own assets (the component's 3D type loads it from a fixed CDN)
    const src = cdnUrl({ path: 'assets/logo-3d.webp', pkg: '@lobehub/assets-logo', version: '1.0.0' });
    return <img alt="LobeHub" height={size} src={src} style={style} width={size} />;
  }

  return (
    <LobeLogo
      extra={
        <a
          href={GITHUB_REPO_URL}
          rel="noreferrer"
          style={{ color: 'inherit', fontWeight: 400 }}
          target="_blank"
        >
          SD
        </a>
      }
      size={size}
      style={style}
      type="combine"
    />
  );
});

export default Logo;
