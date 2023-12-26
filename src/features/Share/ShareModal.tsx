import { Form, type FormItemProps, Modal, type ModalProps } from '@lobehub/ui';
import { Button, Input, Segmented, SegmentedProps, Switch } from 'antd';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import Preview from './Preview';
import PreviewInner from './PreviewInner';
import { type FieldType, ImageType, imageTypeOptions } from './type';
import { useScreenshot } from './useScreenshot';

enum Tab {
  Info = 'info',
  Settings = 'settings',
}

const DEFAULT_FIELD_VALUE: FieldType = {
  imageType: ImageType.JPG,
  showAllImages: false,
  showConfig: true,
  showNegative: true,
  title: '',
  withBackground: true,
  withFooter: false,
};

const ShareModal = memo<ModalProps & { type: 'txt' | 'img' }>(({ open, onCancel, type }) => {
  const [fieldValue, setFieldValue] = useState<FieldType>(DEFAULT_FIELD_VALUE);
  const [tab, setTab] = useState<Tab>(Tab.Info);
  const { t } = useTranslation();
  const { loading, onDownload } = useScreenshot(fieldValue.imageType);
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

  const info: FormItemProps[] = useMemo(
    () => [
      {
        children: <Input />,
        label: t('shareModal.title'),
        name: 'title',
      },
      {
        children: <Switch />,
        label: t('shareModal.showAllImages'),
        minWidth: undefined,
        name: 'showAllImages',
        valuePropName: 'checked',
      },
      {
        children: <Switch />,
        label: t('shareModal.showNegative'),
        minWidth: undefined,
        name: 'showNegative',
        valuePropName: 'checked',
      },
      {
        children: <Switch />,
        label: t('shareModal.showConfig'),
        minWidth: undefined,
        name: 'showConfig',
        valuePropName: 'checked',
      },
    ],
    [],
  );

  const settings: FormItemProps[] = useMemo(
    () => [
      {
        children: <Switch />,
        label: t('shareModal.withBackground'),
        minWidth: undefined,
        name: 'withBackground',
        valuePropName: 'checked',
      },
      {
        children: <Switch />,
        label: t('shareModal.withFooter'),
        minWidth: undefined,
        name: 'withFooter',
        valuePropName: 'checked',
      },
      {
        children: <Segmented options={imageTypeOptions} />,
        label: t('shareModal.imageType'),
        minWidth: undefined,
        name: 'imageType',
      },
    ],
    [],
  );

  return (
    <Modal
      centered={false}
      destroyOnClose
      footer={
        <Button block loading={loading} onClick={onDownload} size={'large'} type={'primary'}>
          {t('shareModal.download')}
        </Button>
      }
      onCancel={onCancel}
      open={open}
      title={t('share')}
    >
      <Flexbox gap={16}>
        <Segmented
          block
          onChange={(value) => setTab(value as Tab)}
          options={options}
          style={{ width: '100%' }}
          value={tab}
        />
        {tab === Tab.Info && (
          <Form
            initialValues={DEFAULT_FIELD_VALUE}
            items={info}
            itemsType={'flat'}
            onValuesChange={(_, v) => setFieldValue(v)}
          />
        )}
        {tab === Tab.Settings && (
          <Form
            initialValues={DEFAULT_FIELD_VALUE}
            items={settings}
            itemsType={'flat'}
            onValuesChange={(_, v) => setFieldValue(v)}
          />
        )}
        <Preview {...fieldValue}>
          <PreviewInner {...fieldValue} type={type} />
        </Preview>
      </Flexbox>
    </Modal>
  );
});

export default ShareModal;
