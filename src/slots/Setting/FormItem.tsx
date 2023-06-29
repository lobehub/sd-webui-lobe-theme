import { FormItemProps as AntdFormItemProps, Form } from 'antd';
import { memo } from 'react';

import FormDivider from '@/slots/Setting/FormDivider';
import FormTitle from '@/slots/Setting/FormTitle';

import { useStyles } from './style';

const { Item } = Form;

export interface FormItemProps extends AntdFormItemProps {
  desc?: string;
  divider?: boolean;
}

const FormItem = memo<FormItemProps>(({ desc, label, children, divider, ...props }) => {
  const { styles } = useStyles();
  return (
    <>
      {divider && <FormDivider />}
      <Item
        className={styles.item}
        label={desc ? <FormTitle desc={desc} title={String(label)} /> : label}
        {...props}
      >
        {children}
      </Item>
    </>
  );
});

export default FormItem;
