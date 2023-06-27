import { ActionIcon } from '@lobehub/ui';
import { PanelLeft, Pin, PinOff } from 'lucide-react';
import { memo } from 'react';

import { DivProps } from '@/types/index';

import { useStyles } from './style';

export interface SidebarHeaderProps extends DivProps {
  pin: boolean;
  position?: 'left' | 'right';
  setExpand: (expand: boolean) => void;
  setPin: (pin: boolean) => void;
  title: string;
}

const SidebarHeader = memo<SidebarHeaderProps>(
  ({ pin, setPin, className, setExpand, title, position = 'left', ...props }) => {
    const { cx, styles } = useStyles();
    const panelIcon = (
      <ActionIcon
        icon={PanelLeft}
        onClick={() => setExpand(false)}
        size={{ blockSize: 24, fontSize: 14 }}
      />
    );
    const pinIcon = (
      <ActionIcon
        active={pin}
        icon={pin ? Pin : PinOff}
        onClick={() => setPin(!pin)}
        size={{ blockSize: 24, fontSize: 14 }}
      />
    );
    return (
      <div className={cx(styles.header, className)} {...props}>
        {position === 'left' ? panelIcon : pinIcon}
        {title}
        {position === 'left' ? pinIcon : panelIcon}
      </div>
    );
  },
);

export default SidebarHeader;
