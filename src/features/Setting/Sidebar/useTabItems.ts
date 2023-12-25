import { Brush, FlaskConical, Layout, PanelRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { SettingsTabs } from '@/features/Setting/Sidebar/index';

export const useTabItems = () => {
  const { t } = useTranslation();

  return [
    { icon: Brush, label: t('setting.tab.appearance'), value: SettingsTabs.Appearance },
    { icon: Layout, label: t('setting.tab.layout'), value: SettingsTabs.Layout },
    { icon: PanelRight, label: t('setting.tab.sidebar'), value: SettingsTabs.Sidebar },
    { icon: FlaskConical, label: t('setting.tab.experimental'), value: SettingsTabs.Experimental },
  ];
};
