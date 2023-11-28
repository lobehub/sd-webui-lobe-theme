import { Brush, FlaskConical, Layout, PanelRight } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import Item from './Item';

export enum SettingsTabs {
  Appearance = 'appearance',
  Experimental = 'experimental',
  Layout = 'layout',
  Sidebar = 'sidebar',
}

interface SidebarProps {
  setTab: (tab: SettingsTabs) => void;
  tab: string;
}

const Sidebar = memo<SidebarProps>(({ tab, setTab }) => {
  const { t } = useTranslation();

  const items = [
    { icon: Brush, label: t('setting.tab.appearance'), value: SettingsTabs.Appearance },
    { icon: Layout, label: t('setting.tab.layout'), value: SettingsTabs.Layout },
    { icon: PanelRight, label: t('setting.tab.sidebar'), value: SettingsTabs.Sidebar },
    { icon: FlaskConical, label: t('setting.tab.experimental'), value: SettingsTabs.Experimental },
  ];

  return (
    <Flexbox gap={4}>
      {items.map(({ value, icon, label }) => (
        <Item
          active={tab === value}
          icon={icon}
          key={value}
          label={label}
          onClick={() => setTab(value)}
        />
      ))}
    </Flexbox>
  );
});

export default Sidebar;
