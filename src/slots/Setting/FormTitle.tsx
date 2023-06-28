import { memo } from 'react';

import { useStyles } from './style';

export interface FormTitleProps {
  desc: string;
  title: string;
}

const FormTitle = memo<FormTitleProps>(({ title, desc }) => {
  const { styles } = useStyles();
  return (
    <div className={styles.formTitle}>
      <div>{title}</div>
      <small>{desc}</small>
    </div>
  );
});

export default FormTitle;
