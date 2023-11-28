import { Modal } from '@lobehub/ui';
import { consola } from 'consola';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Inner from './Inner';
import addShareButton from './addShareButton';

const Share = memo<{ type: 'txt' | 'img' }>(({ type }) => {
  const [open, setOpen] = useState(false);
  const handleShare = useCallback(() => {
    setOpen(true);
  }, []);
  const { t } = useTranslation();
  useEffect(() => {
    try {
      addShareButton(type, handleShare);
      consola.success(`🤯 [layout] inject - Share ${type}`);
    } catch (error) {
      consola.error(`🤯 [layout] inject - Share ${type}`, error);
    }
  }, [type]);

  return (
    <Modal
      centered={false}
      destroyOnClose
      footer={null}
      onCancel={() => setOpen(false)}
      open={open}
      title={t('share')}
    >
      <Inner type={type} />
    </Modal>
  );
});

export default memo(() => {
  return (
    <>
      <Share type={'txt'} />
      <Share type={'img'} />
    </>
  );
});
