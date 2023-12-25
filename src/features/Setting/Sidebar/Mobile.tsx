import { Segmented } from 'antd';
import { memo } from 'react';

import { SettingsTabs } from '@/features/Setting/Sidebar/index';
import { useTabItems } from '@/features/Setting/Sidebar/useTabItems';

interface SidebarProps {
  setTab: (tab: SettingsTabs) => void;
  tab: string;
}

const MobileSidebar = memo<SidebarProps>(({ tab, setTab }) => {
  const items = useTabItems();
  return (
    <Segmented
      block
      onChange={setTab as any}
      options={items.map(({ value, label }) => ({ label, value }))}
      value={tab}
    />
  );
});

export default MobileSidebar;
