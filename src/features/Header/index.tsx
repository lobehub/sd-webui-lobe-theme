import { Header as H, Tooltip } from '@lobehub/ui';
import { useTheme } from 'antd-style';
import { memo } from 'react';

import { Logo } from '@/components';
import { GITHUB_REPO_URL } from '@/const/url';
import { useAppStore } from '@/store';
import { type DivProps } from '@/types';

import Actions from './Actions';
import Nav from './Nav';

const Header = memo<DivProps>(({ children }) => {
  const { themeMode, version } = useAppStore((st) => ({
    themeMode: st.themeMode,
    version: st.version,
  }));
  const theme = useTheme();

  return (
    <H
      actions={<Actions themeMode={themeMode} />}
      actionsStyle={{ flex: 0 }}
      logo={
        <a
          href={`${GITHUB_REPO_URL}/releases`}
          rel="noreferrer"
          style={{ alignItems: 'center', color: theme.colorText, display: 'flex' }}
          target="_blank"
        >
          <Tooltip title={`LobeTheme v${version}`}>
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
