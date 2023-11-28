import { Icon, List } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { type LucideIcon } from 'lucide-react';
import { CSSProperties, ReactNode, memo } from 'react';

const { Item } = List;

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    position: relative;
    padding: 16px;
    border-radius: ${token.borderRadius}px;

    div {
      overflow: visible;
      font-size: 16px;
      font-weight: 500;
    }
  `,
}));

export interface ItemProps {
  active?: boolean;
  className?: string;
  icon: LucideIcon;
  label: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
}

const SettingItem = memo<ItemProps>(
  ({ label, icon, active = false, style, className, onClick }) => {
    const { cx, styles } = useStyles();
    return (
      <Item
        active={active}
        avatar={<Icon icon={icon} size={{ fontSize: 16 }} />}
        className={cx(styles.container, className)}
        onClick={onClick}
        style={style}
        title={label as string}
      />
    );
  },
);

export default SettingItem;
