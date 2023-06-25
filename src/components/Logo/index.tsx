import { type CSSProperties, memo } from 'react';

import { ImgProps } from '@/types/index';

import { darkLogo, lightLogo } from './style';

export interface LogoProps extends ImgProps {
  size?: number;
  style?: CSSProperties;
  themeMode: 'dark' | 'light';
}

const Logo = memo<LogoProps>(({ size = 20, style, themeMode, ...props }) => {
  return (
    <img
      alt="logo"
      src={themeMode === 'dark' ? darkLogo : lightLogo}
      style={{ height: size, ...style }}
      {...props}
    />
  );
});

export default Logo;
