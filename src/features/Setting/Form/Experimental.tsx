import { Form } from '@lobehub/ui';
import { Switch } from 'antd';
import isEqual from 'fast-deep-equal';
import { Puzzle, TextCursorInput } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Footer from '@/features/Setting/Form/Footer';
import { SettingItemGroup } from '@/features/Setting/Form/types';
import { selectors, useAppStore } from '@/store';

const SettingForm = memo(() => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const onSetSetting = useAppStore((st) => st.onSetSetting);

  const { t } = useTranslation();

  const experimental: SettingItemGroup = useMemo(
    () => ({
      children: [
        {
          children: <Switch />,
          desc: t('setting.imageInfo.desc'),
          label: t('setting.imageInfo.title'),
          name: 'enableImageInfo',
          valuePropName: 'checked',
        },
      ],
      icon: Puzzle,
      title: t('setting.group.experimental'),
    }),
    [],
  );

  const promptTextarea: SettingItemGroup = useMemo(
    () => ({
      children: [
        {
          children: <Switch />,
          desc: t('setting.promptHighlight.desc'),
          label: t('setting.promptHighlight.title'),
          name: 'enableHighlight',
          valuePropName: 'checked',
        },
        {
          children: <Switch />,
          desc: t('setting.promptEditor.desc'),
          label: t('setting.promptEditor.title'),
          name: 'promptEditor',
          valuePropName: 'checked',
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
      items={[experimental, promptTextarea]}
      onFinish={onSetSetting}
      style={{ flex: 1 }}
    />
  );
});

export default SettingForm;
