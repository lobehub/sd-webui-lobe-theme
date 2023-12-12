import { Modal } from '@lobehub/ui';
import { memo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useInject } from '@/hooks/useInject';

import Inner from './Inner';
import { createButton } from './createButton';

const Share = memo<{ type: 'txt' | 'img' }>(({ type }) => {
  const [open, setOpen] = useState(false);
  const buttonReference = useRef<any>(createButton(type, setOpen));
  const { t } = useTranslation();

  useInject(buttonReference, `#image_buttons_${type}2img > .form`, {
    debug: `[layout] inject - Share ${type}`,
    inverse: true,
  });

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
