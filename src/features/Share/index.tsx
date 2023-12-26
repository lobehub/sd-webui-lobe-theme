import { memo, useRef, useState } from 'react';

import { useInject } from '@/hooks/useInject';

import ShareModal from './ShareModal';
import { createButton } from './createButton';

const Share = memo<{ type: 'txt' | 'img' }>(({ type }) => {
  const [open, setOpen] = useState(false);
  const buttonReference = useRef<any>(createButton(type, setOpen));

  useInject(buttonReference, `#image_buttons_${type}2img > .form`, {
    debug: `[layout] inject - Share ${type}`,
    inverse: true,
  });

  return <ShareModal onCancel={() => setOpen(false)} open={open} type={type} />;
});

export default memo(() => {
  return (
    <>
      <Share type={'txt'} />
      <Share type={'img'} />
    </>
  );
});
