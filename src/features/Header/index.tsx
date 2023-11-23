import { Header as H, Tooltip } from '@lobehub/ui';
import { useTheme } from 'antd-style';
import { memo } from 'react';
import { shallow } from 'zustand/shallow';

import { Logo } from '@/components';
import { useAppStore } from '@/store';
import { type DivProps } from '@/types';

import { homepage, name } from '../../../package.json';
import Actions from './Actions';
import Nav from './Nav';

const Header = memo<DivProps>(({ children }) => {
    const { themeMode, version } = useAppStore(
        (st) => ({ themeMode: st.themeMode, version: st.version }),
        shallow,
    );
    const theme = useTheme();

    return (
        <H
            actions={<Actions themeMode={themeMode} />}
            actionsStyle={{ flex: 0 }}
            logo={
                <a
                    href={`${homepage}/releases`}
                    rel="noreferrer"
                    style={{ alignItems: 'center', color: theme.colorText, display: 'flex' }}
                    target="_blank"
                >
                    <Tooltip title={`${name} v${version}`}>
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
