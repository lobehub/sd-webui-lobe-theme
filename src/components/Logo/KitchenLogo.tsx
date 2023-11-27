import { type CSSProperties, memo } from 'react';

import { darkLogo, lightLogo } from './style';

export interface KitchenLogoProps {
  size?: number;
  style?: CSSProperties;
  themeMode: 'dark' | 'light';
}

const KitchenLogo = memo<KitchenLogoProps>(({ size = 32, style, themeMode }) => {
  return (
    <img
      alt="logo"
      src={themeMode === 'dark' ? darkLogo : lightLogo}
      style={{ height: size, ...style }}
    />
  );
});

export default KitchenLogo;
