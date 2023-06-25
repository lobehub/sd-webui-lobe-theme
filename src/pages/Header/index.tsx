import { Header as H, Logo } from '@lobehub/ui';
import { useTheme } from 'antd-style';
import { memo } from 'react';
import { shallow } from 'zustand/shallow';

import { useAppStore } from '@/store';
import { DivProps } from '@/types/index';

import Actions from './Actions';
import Nav from './Nav';

const Header = memo<DivProps>(({ children }) => {
  const themeMode = useAppStore((st) => st.themeMode, shallow);
  const theme = useTheme();

  return (
    <H
      actions={<Actions themeMode={themeMode} />}
      actionsStyle={{ flex: 0 }}
      logo={
        <a
          href="https://github.com/canisminor1990/sd-webui-kitchen-theme"
          rel="noreferrer"
          style={{ color: theme.colorText }}
          target="_blank"
        >
          <Logo extra="SD" type="combine" />
        </a>
      }
      nav={
        <>
          <Nav />
          {children}
        </>
      }
    />
  );
});

export default Header;
