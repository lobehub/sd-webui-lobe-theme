import { Header as H } from '@lobehub/ui';
import { memo } from 'react';
import { shallow } from 'zustand/shallow';

import { useAppStore } from '@/store';
import { DivProps } from '@/types/index';

import Actions from './Actions';
import Logo from './Logo';
import Nav from './Nav';

const Header = memo<DivProps>(({ children }) => {
  const themeMode = useAppStore((st) => st.themeMode, shallow);

  return (
    <H
      actions={<Actions themeMode={themeMode} />}
      logo={
        <a
          href="https://github.com/canisminor1990/sd-webui-kitchen-theme"
          rel="noreferrer"
          target="_blank"
        >
          <Logo themeMode={themeMode} />
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
