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

  const buttonStyle = mobile ? { flex: 1 } : { margin: 0 };

  return (
    <Flexbox flex={1} gap={12} horizontal justify={'flex-end'}>
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
      <Button htmlType="submit" style={buttonStyle} type="primary">
        {t('setting.button.submit')}
      </Button>
    </Flexbox>
  );
});
export default Footer;
