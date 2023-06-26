import { ActionIcon, Icon } from '@lobehub/ui';
import { PanelLeft, Pin, PinOff } from 'lucide-react';
import { memo } from 'react';

import { DivProps } from '@/types/index';

import { useStyles } from './style';

export interface SidebarHeaderProps extends DivProps {
  pin: boolean;
  position?: 'left' | 'right';
  setPin: (pin: boolean) => void;
  title: string;
}

const SidebarHeader = memo<SidebarHeaderProps>(
  ({ pin, setPin, className, title, position = 'left', ...props }) => {
    const { cx, styles } = useStyles();
    const panelIcon = <Icon icon={PanelLeft} />;
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
