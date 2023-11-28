import { Form, ItemGroup } from '@lobehub/ui';
import { Input, Segmented, SegmentedProps, Switch } from 'antd';
import { Image, Share2 } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import Preview, { ImageType, imageTypeOptions } from './Preview';
import PreviewInner from './PreviewInner';

enum Tab {
  Info = 'info',
  Settings = 'settings',
}

const Inner = memo<{ type: 'txt' | 'img' }>(({ type }) => {
  const [title, setTitle] = useState('');
  const [withBackground, setWithBackground] = useState(true);
  const [withFooter, setWithFooter] = useState(true);
  const [showConfig, setShowConfig] = useState(true);
  const [showNegative, setShowNegative] = useState(true);
  const [showAllImages, setShowAllImages] = useState(false);
  const [imageType, setImageType] = useState<ImageType>(ImageType.JPG);
  const [tab, setTab] = useState<Tab>(Tab.Info);
  const { t } = useTranslation();

  const options: SegmentedProps['options'] = useMemo(
    () => [
      {
        label: t('shareModal.tabs.info'),
        value: Tab.Info,
      },
      {
        label: t('shareModal.tabs.settings'),
        value: Tab.Settings,
      },
    ],
    [],
  );

  const info: ItemGroup = useMemo(
    () =>
      ({
        children: [
          {
            children: <Input onChange={(e) => setTitle(e.target.value)} value={title} />,
            label: t('shareModal.title'),
          },
          {
            children: <Switch checked={showAllImages} onChange={setShowAllImages} />,
            label: t('shareModal.showAllImages'),
            minWidth: undefined,
          },
          {
            children: <Switch checked={showNegative} onChange={setShowNegative} />,
            label: t('shareModal.showNegative'),
            minWidth: undefined,
          },
          {
            children: <Switch checked={showConfig} onChange={setShowConfig} />,
            label: t('shareModal.showConfig'),
            minWidth: undefined,
          },
        ].filter(Boolean),
        icon: Image,
        title: t('shareModal.info'),
      }) as ItemGroup,
    [title, showAllImages, showNegative, showConfig],
  );

  const settings: ItemGroup = useMemo(
    () =>
      ({
        children: [
          {
            children: <Switch checked={withBackground} onChange={setWithBackground} />,
            label: t('shareModal.withBackground'),
            minWidth: undefined,
          },
          {
            children: <Switch checked={withFooter} onChange={setWithFooter} />,
            label: t('shareModal.withFooter'),
            minWidth: undefined,
          },
          {
            children: (
              <Segmented
                onChange={(value) => setImageType(value as ImageType)}
                options={imageTypeOptions}
                value={imageType}
              />
            ),
            label: t('shareModal.imageType'),
            minWidth: undefined,
          },
        ].filter(Boolean),
        icon: Share2,
        title: t('shareModal.settings'),
      }) as ItemGroup,
    [withBackground, withFooter, imageType],
  );

  return (
    <Flexbox gap={16}>
      <Segmented
        block
        onChange={(value) => setTab(value as Tab)}
        options={options}
        style={{ width: '100%' }}
        value={tab}
      />
      {tab === Tab.Info && <Form items={[info]} />}
      {tab === Tab.Settings && <Form items={[settings]} />}
      <Preview imageType={imageType} withBackground={withBackground} withFooter={withFooter}>
        <PreviewInner
          showAllImages={showAllImages}
          showConfig={showConfig}
          showNegative={showNegative}
          title={title}
          type={type}
        />
      </Preview>
    </Flexbox>
  );
});

export default Inner;
