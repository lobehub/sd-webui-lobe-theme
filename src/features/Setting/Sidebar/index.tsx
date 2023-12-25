import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useTabItems } from '@/features/Setting/Sidebar/useTabItems';

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
  const items = useTabItems();

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

export { default as MobileSidebar } from './Mobile';
