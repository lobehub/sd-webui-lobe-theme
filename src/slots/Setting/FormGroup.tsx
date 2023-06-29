import { Icon, type IconProps } from '@lobehub/ui';
import { Collapse, type CollapseProps } from 'antd';
import { type ReactNode, memo } from 'react';

import { useStyles } from './style';

export interface FormGroupProps extends CollapseProps {
  children: ReactNode;
  icon: IconProps['icon'];
  title: string;
}

const FormGroup = memo<FormGroupProps>(({ icon, title, children, ...props }) => {
  const { styles } = useStyles();
  return (
    <Collapse
      className={styles.group}
      defaultActiveKey={[1]}
      items={[
        {
          children,
          key: 1,
          label: (
            <div className={styles.title}>
              <Icon icon={icon} />
              {title}
            </div>
          ),
        },
      ]}
      key={1}
      {...props}
    />
  );
});

export default FormGroup;
