import { Icon } from '@lobehub/ui';
import { Modal as AntModal, type ModalProps as AntModalProps } from 'antd';
import { X } from 'lucide-react';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useStyles } from './style';

export type ModalProps = AntModalProps;

const Modal = memo<ModalProps>(({ className, title, open, onCancel, children, ...props }) => {
  const { cx, styles } = useStyles();

  return (
    <AntModal
      cancelText={'Cancel'}
      className={cx(styles.modal, className)}
      closeIcon={<Icon icon={X} />}
      footer={null}
      onCancel={onCancel}
      open={open}
      title={
        <Flexbox align={'center'} gap={4} horizontal justify={'center'}>
          {title}
        </Flexbox>
      }
      width={800}
      {...props}
    >
      {children}
    </AntModal>
  );
});

export default Modal;
