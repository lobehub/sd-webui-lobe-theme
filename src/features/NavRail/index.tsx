/**
 * The Studio layouts' left rail: the logo, the pinned tabs as icons (initials
 * for extension tabs without an icon), "All tabs", and the header's actions
 * at the bottom. It takes the place of the header, so the page gets the full
 * height.
 */
import { Icon, Tooltip } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { memo } from 'react';

import { Logo } from '@/components';
import Actions from '@/features/Header/Actions';
import TabLauncher, { ICONS, initials } from '@/features/Header/TabLauncher';
import { useNavBar } from '@/features/Header/useNavBar';
import { useNavPins } from '@/features/Header/useNavPins';
import { selectors, useAppStore } from '@/store';

export const RAIL_WIDTH = 60;

const useStyles = createStyles(({ css, token }) => ({
  rail: css`
    position: relative;
    z-index: 60;

    overflow: hidden auto;
    display: flex;
    flex: none;
    flex-direction: column;
    gap: 6px;
    align-items: center;

    width: ${RAIL_WIDTH}px;
    height: 100vh;
    padding: 12px 0;

    background: ${token.colorBgContainer};
    border-inline-end: 1px solid ${token.colorBorderSecondary};

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  logo: css`
    overflow: hidden;
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;
    margin-block-end: 6px;
  `,
  tab: css`
    cursor: pointer;

    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    font-size: 12px;
    font-weight: 700;
    color: ${token.colorTextSecondary};
    letter-spacing: 0.02em;

    background: ${token.colorFillQuaternary};
    border: 1px solid transparent;
    border-radius: ${token.borderRadius}px;

    transition: all 150ms ${token.motionEaseOut};

    &:hover {
      color: ${token.colorText};
      background: ${token.colorFillTertiary};
    }
  `,
  active: css`
    color: ${token.colorTextLightSolid} !important;
    background: ${token.colorPrimary} !important;
  `,
  spacer: css`
    flex: 1;
    min-height: 8px;
  `,
}));

const NavRail = memo(() => {
  const { styles, cx } = useStyles();
  const currentTab = useAppStore(selectors.currentTab);
  const { list, onChange } = useNavBar();
  const { pins, toggle, reset } = useNavPins();
  const themeMode = useAppStore(selectors.themeMode);

  const shown = list.filter((item) => pins.includes(item.id) || item.id === currentTab);
  const hiddenCount = list.filter((item) => !pins.includes(item.id)).length;

  return (
    <nav className={styles.rail} id="lobe-nav-rail">
      <div className={styles.logo}>
        <Logo compact size={32} />
      </div>
      {shown.map((item) => {
        const icon = ICONS[item.id];
        return (
          <Tooltip key={item.id} placement={'right'} title={item.label}>
            <button
              className={cx(styles.tab, item.id === currentTab && styles.active)}
              data-tab={item.id}
              onClick={() => onChange(item.id)}
              type="button"
            >
              {icon ? <Icon icon={icon} size={{ fontSize: 18 }} /> : initials(item.label)}
            </button>
          </Tooltip>
        );
      })}
      <TabLauncher
        activeKey={currentTab}
        compact
        hiddenCount={hiddenCount}
        items={list}
        onOpen={onChange}
        onReset={reset}
        onTogglePin={toggle}
        pins={pins}
      />
      <div className={styles.spacer} />
      <Actions themeMode={themeMode} vertical />
    </nav>
  );
});

export default NavRail;
