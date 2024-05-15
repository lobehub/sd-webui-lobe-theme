import { Icon } from '@lobehub/ui';
import { Brush, FlaskConical, Layout, PanelRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { SettingsTabs } from '@/features/Setting/Sidebar/index';

export const useTabItems = () => {
  const { t } = useTranslation();

  return [
    {
      icon: <Icon icon={Brush} />,
      key: SettingsTabs.Appearance,
      label: t('setting.tab.appearance'),
    },
    { icon: <Icon icon={Layout} />, key: SettingsTabs.Layout, label: t('setting.tab.layout') },
    {
      icon: <Icon icon={PanelRight} />,
      key: SettingsTabs.Sidebar,
      label: t('setting.tab.sidebar'),
    },
    {
      icon: <Icon icon={FlaskConical} />,
      key: SettingsTabs.Experimental,
      label: t('setting.tab.experimental'),
    },
  ];
};
