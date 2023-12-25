import { Button, Popconfirm } from 'antd';
import { useResponsive } from 'antd-style';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { DEFAULT_SETTING, useAppStore } from '@/store';

const Footer = memo(() => {
  const { t } = useTranslation();
  const { mobile } = useResponsive();
  const onSetSetting = useAppStore((st) => st.onSetSetting);

  const onReset = useCallback(() => {
    onSetSetting(DEFAULT_SETTING);
    location.reload();
  }, []);

  return (
    <Flexbox gap={16} horizontal={!mobile} style={mobile ? { padding: 16, width: '100%' } : {}}>
      <Popconfirm
        cancelText={t('cancel')}
        okText={t('confirm')}
        okType={'danger'}
        onConfirm={onReset}
        title={t('setting.button.reset')}
      >
        <Button block={mobile} danger style={{ borderRadius: 4 }}>
          {t('setting.button.reset')}
        </Button>
      </Popconfirm>
      <Button block={mobile} htmlType="submit" style={{ borderRadius: 4 }} type="primary">
        {t('setting.button.submit')}
      </Button>
    </Flexbox>
  );
});
export default Footer;
