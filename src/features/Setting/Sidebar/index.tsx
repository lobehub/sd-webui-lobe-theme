import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import VersionTag from '../../../components/VersionTag';
import Menu from './Menu';
import SidebarLayout from './SidebarLayout';
import { useTabItems } from './useTabItems';

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
  const { t } = useTranslation();
  return (
    <SidebarLayout
      desc={
        <Flexbox align={'center'} gap={8} horizontal wrap={'wrap'}>
          {t('modal.themeSetting.desc')}
          <VersionTag />
        </Flexbox>
      }
      title={t('modal.themeSetting.title')}
    >
      <Menu
        items={items}
        onClick={({ key }) => setTab(key as SettingsTabs)}
        selectable
        selectedKeys={[tab as any]}
      />
    </SidebarLayout>
  );
});

export default Sidebar;

export { default as MobileSidebar } from './Mobile';
