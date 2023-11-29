import { Button, Popconfirm } from 'antd';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_SETTING, useAppStore } from '@/store';

const Footer = memo(() => {
  const { t } = useTranslation();

  const onSetSetting = useAppStore((st) => st.onSetSetting);

  const onReset = useCallback(() => {
    onSetSetting(DEFAULT_SETTING);
    location.reload();
  }, []);

  return (
    <>
      <Popconfirm
        cancelText={t('cancel')}
        okText={t('confirm')}
        okType={'danger'}
        onConfirm={onReset}
        title={t('setting.button.reset')}
      >
        <Button danger style={{ borderRadius: 4 }}>
          {t('setting.button.reset')}
        </Button>
      </Popconfirm>
      <Button htmlType="submit" style={{ borderRadius: 4 }} type="primary">
        {t('setting.button.submit')}
      </Button>
    </>
  );
});
export default Footer;
