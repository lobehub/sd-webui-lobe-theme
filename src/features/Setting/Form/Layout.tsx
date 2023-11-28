import { Form } from '@lobehub/ui';
import { Segmented, Switch } from 'antd';
import isEqual from 'fast-deep-equal';
import { Layout, TextCursorInput } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Footer from '@/features/Setting/Form/Footer';
import { SettingItemGroup } from '@/features/Setting/Form/types';
import { selectors, useAppStore } from '@/store';

const SettingForm = memo(() => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const onSetSetting = useAppStore((st) => st.onSetSetting);

  const { t } = useTranslation();

  const layout: SettingItemGroup = useMemo(
    () => ({
      children: [
        {
          children: <Switch />,
          desc: t('setting.splitPreviewer.desc'),
          label: t('setting.splitPreviewer.title'),
          name: 'layoutSplitPreview',
          valuePropName: 'checked',
        },
        {
          children: <Switch />,
          desc: t('setting.hideFooter.desc'),
          label: t('setting.hideFooter.title'),
          name: 'layoutHideFooter',
          valuePropName: 'checked',
        },
      ],
      icon: Layout,
      title: t('setting.group.layout'),
    }),
    [],
  );

  const promptTextarea: SettingItemGroup = useMemo(
    () => ({
      children: [
        {
          children: (
            <Segmented
              options={[
                {
                  label: t('setting.promptDisplayMode.scroll'),
                  value: 'scroll',
                },
                {
                  label: t('setting.promptDisplayMode.resizable'),
                  value: 'resizable',
                },
              ]}
            />
          ),
          desc: t('setting.promptDisplayMode.desc'),
          label: t('setting.promptDisplayMode.title'),
          name: 'promptTextareaType',
        },
      ],
      icon: TextCursorInput,
      title: t('setting.group.promptTextarea'),
    }),
    [],
  );

  return (
    <Form
      footer={<Footer />}
      initialValues={setting}
      items={[layout, promptTextarea]}
      onFinish={onSetSetting}
      style={{ flex: 1 }}
    />
  );
});

export default SettingForm;
