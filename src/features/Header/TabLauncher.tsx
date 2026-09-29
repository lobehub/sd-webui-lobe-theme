import { Icon } from '@lobehub/ui';
import { Popover } from 'antd';
import { createStyles } from 'antd-style';
import {
  ChevronDown,
  FileSearch,
  Film,
  GraduationCap,
  Images,
  LayoutGrid,
  type LucideIcon,
  Maximize2,
  Merge,
  Pin,
  Puzzle,
  Rotate3d,
  Settings2,
  Wand2,
} from 'lucide-react';
import { memo, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { NavGroup, NavItem } from './genNavList';

export const ICONS: Record<string, LucideIcon> = {
  tab_extensions: Puzzle,
  tab_extras: Maximize2,
  tab_img2img: Images,
  tab_modelmerger: Merge,
  tab_pnginfo: FileSearch,
  tab_settings: Settings2,
  tab_space: LayoutGrid,
  tab_svd: Film,
  tab_train: GraduationCap,
  tab_txt2img: Wand2,
  tab_z123: Rotate3d,
};
const GROUPS: NavGroup[] = ['generate', 'tools', 'extensions', 'system'];

const useStyles = createStyles(({ css, token }) => ({
  active: css`
    color: ${token.colorPrimaryText};
    background: ${token.colorPrimaryBg} !important;
  `,
  avatar: css`
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;

    width: 26px;
    height: 26px;

    font-size: 12px;
    font-weight: 700;
    color: ${token.colorTextSecondary};

    background: ${token.colorFillSecondary};
    border-radius: 7px;
  `,
  footer: css`
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;

    padding: 10px 14px;

    font-size: 12px;
    color: ${token.colorTextTertiary};

    border-top: 1px solid ${token.colorBorderSecondary};

    a {
      cursor: pointer;
      color: ${token.colorTextSecondary};
    }
  `,
  grid: css`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 4px;
    padding: 0 10px;
  `,
  group: css`
    padding: 12px 14px 6px;
    font-size: 11px;
    font-weight: 600;
    color: ${token.colorTextTertiary};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,
  label: css`
    overflow: hidden;
    flex: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  panel: css`
    width: min(640px, calc(100vw - 32px));
  `,
  pin: css`
    cursor: pointer;

    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;

    width: 22px;
    height: 22px;

    color: ${token.colorTextQuaternary};

    opacity: 0;
    border-radius: 5px;

    &:hover {
      color: ${token.colorText};
      background: ${token.colorFillSecondary};
    }
  `,
  pinned: css`
    color: ${token.colorPrimary} !important;
    opacity: 1 !important;
  `,
  scroll: css`
    overflow-y: auto;
    max-height: min(65vh, 560px);
    padding-bottom: 10px;
  `,
  search: css`
    box-sizing: border-box;
    width: calc(100% - 28px) !important;
    height: 34px !important;
    margin: 12px 14px 4px;
    padding: 0 11px;

    font-size: 14px;
    color: ${token.colorText};

    background: ${token.colorFillQuaternary};
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
    outline: none;

    &:focus {
      border-color: ${token.colorPrimary};
    }
  `,
  tile: css`
    cursor: pointer;

    display: flex;
    gap: 8px;
    align-items: center;

    padding: 6px 6px 6px 8px;

    font-size: 13px;

    border-radius: ${token.borderRadius}px;

    &:hover {
      background: ${token.colorFillTertiary};
    }

    &:hover .pin-button {
      opacity: 1;
    }
  `,
  trigger: css`
    cursor: pointer;

    display: flex;
    flex: none;
    gap: 6px;
    align-items: center;

    height: 32px;
    padding: 0 10px;

    font-size: 14px;
    color: ${token.colorTextSecondary};
    white-space: nowrap;

    background: transparent;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadius}px;

    transition: all 150ms ${token.motionEaseOut};

    &:hover {
      color: ${token.colorText};
      background: ${token.colorFillTertiary};
    }
  `,
  triggerBadge: css`
    position: absolute;
    inset-block-start: -6px;
    inset-inline-end: -8px;

    padding: 0 5px;

    font-size: 10px;
    line-height: 16px;
    color: ${token.colorTextSecondary};

    background: ${token.colorBgElevated};
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: 8px;
  `,
  triggerCompact: css`
    cursor: pointer;

    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    color: ${token.colorTextSecondary};

    background: transparent;
    border: 1px dashed ${token.colorBorder};
    border-radius: ${token.borderRadius}px;

    &:hover {
      color: ${token.colorText};
      background: ${token.colorFillTertiary};
    }
  `,
  triggerCount: css`
    padding: 0 6px;
    font-size: 11px;
    line-height: 18px;
    color: ${token.colorTextSecondary};
    background: ${token.colorFillSecondary};
    border-radius: 9px;
  `,
}));

/** Initials for an extension tab without an icon of its own. */
export const initials = (label: string) => {
  const words = label.replaceAll(/[^\d\sA-Za-z]/g, ' ').split(/\s+/).filter(Boolean);
  if (words.length === 0) return label.slice(0, 1).toUpperCase();
  return (words.length === 1 ? words[0].slice(0, 2) : words[0][0] + words[1][0]).toUpperCase();
};

interface TabLauncherProps {
  activeKey: string;
  /** An icon-only button, for the side rail of the Studio layouts. */
  compact?: boolean;
  hiddenCount: number;
  items: NavItem[];
  onOpen: (id: string) => void;
  onReset: () => void;
  onTogglePin: (id: string) => void;
  pins: string[];
}

const TabLauncher = memo<TabLauncherProps>(
  ({ items, pins, activeKey, hiddenCount, onOpen, onTogglePin, onReset, compact }) => {
    const { t } = useTranslation();
    const { styles, cx } = useStyles();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const input = useRef<HTMLInputElement>(null);

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      return q ? items.filter((item) => item.label.toLowerCase().includes(q)) : items;
    }, [items, query]);

    const openTab = (id: string) => {
      onOpen(id);
      setOpen(false);
    };

    const content = (
      <div className={styles.panel}>
        <input
          className={cx('border-none', styles.search)}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && filtered[0]) openTab(filtered[0].id);
          }}
          placeholder={t('header.nav.search')}
          ref={input}
          type="search"
          value={query}
        />
        <div className={styles.scroll}>
          {filtered.length === 0 && <div className={styles.group}>{t('header.nav.empty')}</div>}
          {GROUPS.map((group) => {
            const list = filtered.filter((item) => item.group === group);
            if (list.length === 0) return null;
            return (
              <div key={group}>
                <div className={styles.group}>{t(`header.nav.groups.${group}` as any) as string}</div>
                <div className={styles.grid}>
                  {list.map((item) => {
                    const pinned = pins.includes(item.id);
                    const icon = ICONS[item.id];
                    return (
                      <div
                        className={cx(styles.tile, item.id === activeKey && styles.active)}
                        data-tab={item.id}
                        key={item.id}
                        onClick={() => openTab(item.id)}
                        title={item.label}
                      >
                        <span className={styles.avatar}>
                          {icon ? <Icon icon={icon} size={{ fontSize: 15 }} /> : initials(item.label)}
                        </span>
                        <span className={styles.label}>{item.label}</span>
                        <span
                          className={cx('pin-button', styles.pin, pinned && styles.pinned)}
                          onClick={(event) => {
                            event.stopPropagation();
                            onTogglePin(item.id);
                          }}
                          title={pinned ? t('header.nav.unpin') : t('header.nav.pin')}
                        >
                          <Icon icon={Pin} size={{ fontSize: 13 }} />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.footer}>
          <span>{t('header.nav.hint')}</span>
          <a onClick={onReset}>{t('header.nav.reset')}</a>
        </div>
      </div>
    );

    return (
      <Popover
        arrow={false}
        content={content}
        onOpenChange={(value) => {
          setOpen(value);
          if (value) {
            setQuery('');
            setTimeout(() => input.current?.focus(), 60);
          }
        }}
        open={open}
        overlayInnerStyle={{ padding: 0 }}
        placement={compact ? 'rightBottom' : 'bottomLeft'}
        trigger={'click'}
      >
        {compact ? (
          <button className={styles.triggerCompact} id="lobe-all-tabs" title={t('header.nav.allTabs')} type="button">
            <Icon icon={LayoutGrid} size={{ fontSize: 18 }} />
            {hiddenCount > 0 && <span className={styles.triggerBadge}>+{hiddenCount}</span>}
          </button>
        ) : (
        <button className={styles.trigger} id="lobe-all-tabs" type="button">
          {t('header.nav.allTabs')}
          {hiddenCount > 0 && <span className={styles.triggerCount}>+{hiddenCount}</span>}
          <Icon icon={ChevronDown} size={{ fontSize: 14 }} />
        </button>
        )}
      </Popover>
    );
  },
);

export default TabLauncher;
