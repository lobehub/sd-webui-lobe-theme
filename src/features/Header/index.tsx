import { Header as H, Tooltip } from '@lobehub/ui';
import { useTheme } from 'antd-style';
import { memo } from 'react';

import { Logo } from '@/components';
import { OFFICIAL_SITE } from '@/const/url';
import { useAppStore } from '@/store';
import { type DivProps } from '@/types';

import Actions from './Actions';
import Nav from './Nav';

const Header = memo<DivProps>(({ children }) => {
  const themeMode = useAppStore((st) => st.themeMode);
  const logoType = useAppStore((st) => st.setting.logoType);
  const theme = useTheme();

  return (
    <H
      actions={<Actions themeMode={themeMode} />}
      actionsStyle={{ flex: 0 }}
      logo={
        logoType === 'none' ? undefined : <a
          href={OFFICIAL_SITE}
          rel="noreferrer"
          style={{ alignItems: 'center', color: theme.colorText, display: 'flex' }}
          target="_blank"
        >
          <Tooltip title={'Lobe Theme Redux'}>
            <Logo />
          </Tooltip>
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
