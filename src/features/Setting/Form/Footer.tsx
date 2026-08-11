import { Button, Popconfirm, Upload, message } from 'antd';
import { useResponsive } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { DEFAULT_SETTING, selectors, useAppStore } from '@/store';
import { downloadSettingJson, readSettingJsonFile } from '@/utils/settingBackup';

const Footer = memo(() => {
  const { t } = useTranslation();
  const { mobile } = useResponsive();
  const onSetSetting = useAppStore((st) => st.onSetSetting);
  const setting = useAppStore(selectors.currentSetting, isEqual);

  const onReset = useCallback(async () => {
    await onSetSetting(DEFAULT_SETTING);
    location.reload();
  }, [onSetSetting]);

  const onExport = useCallback(() => {
    downloadSettingJson(setting);
    message.success(t('setting.button.exportSuccess'));
  }, [setting, t]);

  const onImportFile = useCallback(
    async (file: File) => {
      try {
        const imported = await readSettingJsonFile(file);
        await onSetSetting(imported);
        message.success(t('setting.button.importSuccess'));
        location.reload();
      } catch {
        message.error(t('setting.button.importError'));
      }
    },
    [onSetSetting, t],
  );

  const buttonStyle = mobile ? { flex: 1 } : { margin: 0 };

  return (
    <Flexbox flex={1} gap={12} horizontal justify={'space-between'} wrap={'wrap'}>
      <Flexbox gap={8} horizontal style={mobile ? { flex: 1, width: '100%' } : undefined}>
        <Button onClick={onExport} style={buttonStyle}>
          {t('setting.button.export')}
        </Button>
        <Upload
          accept="application/json,.json"
          beforeUpload={(file) => {
            void onImportFile(file);
            return false;
          }}
          showUploadList={false}
        >
          <Button style={buttonStyle}>{t('setting.button.import')}</Button>
        </Upload>
      </Flexbox>

      <Flexbox gap={8} horizontal style={mobile ? { flex: 1, width: '100%' } : undefined}>
        <Popconfirm
          cancelText={t('cancel')}
          okText={t('confirm')}
          okType={'danger'}
          onConfirm={onReset}
          title={t('setting.button.reset')}
        >
          <Button danger style={buttonStyle}>
            {t('setting.button.reset')}
          </Button>
        </Popconfirm>
        <Button form="theme_settings" htmlType="submit" style={buttonStyle} type="primary">
          {t('setting.button.submit')}
        </Button>
      </Flexbox>
    </Flexbox>
  );
});

export default Footer;
