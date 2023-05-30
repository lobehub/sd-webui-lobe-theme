import { useHover } from 'ahooks';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import type { Enable, NumberSize, Size } from 're-resizable';
import { HandleClassName, Resizable } from 're-resizable';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Center } from 'react-layout-kit';
import type { Props as RndProps } from 'react-rnd';
import useControlledState from 'use-merge-value';

import type { DivProps } from '@/types';

import { useStyle } from './style';
import { revesePlacement } from './utils';

const DEFAULT_HEIGHT = 180;
const DEFAULT_WIDTH = 280;

export type placementType = 'right' | 'left' | 'top' | 'bottom';

export interface DraggablePanelProps extends DivProps {
  defaultExpand?: boolean;
  defaultSize?: Partial<Size>;
  destroyOnClose?: boolean;
  expand?: boolean;
  expandable?: boolean;
  hanlderStyle?: React.CSSProperties;
  minHeight?: number;
  minWidth?: number;
  mode?: 'fixed' | 'float';
  onExpandChange?: (expand: boolean) => void;
  onSizeChange?: (delta: NumberSize, size?: Size) => void;
  onSizeDragging?: (delta: NumberSize, size?: Size) => void;
  pin?: boolean;
  placement: placementType;
  resize?: RndProps['enableResizing'];
  showHandlerWhenUnexpand?: boolean;
  size?: Partial<Size>;
}

const DraggablePanel: React.FC<DraggablePanelProps> = ({
  pin = 'true',
  mode = 'fixed',
  children,
  placement = 'right',
  resize,
  style,
  size,
  defaultSize: customizeDefaultSize,
  minWidth,
  minHeight,
  onSizeChange,
  onSizeDragging,
  expandable = true,
  expand,
  defaultExpand = true,
  onExpandChange,
  className,
  showHandlerWhenUnexpand,
  destroyOnClose,
  hanlderStyle,
}) => {
  const ref = useRef(null);
  const isHovering = useHover(ref);
  const isVertical = placement === 'top' || placement === 'bottom';

  const { styles, cx } = useStyle('draggable-panel');

  const [isExpand, setIsExpand] = useControlledState(defaultExpand, {
    value: expand,
    onChange: onExpandChange,
  });

  useEffect(() => {
    if (pin) return;
    if (isHovering && !isExpand) {
      setIsExpand(true);
    } else if (!isHovering && isExpand) {
      setIsExpand(false);
    }
  }, [pin, isHovering, isExpand]);

  const [showExpand, setShowExpand] = useState(true);

  const canResizing = resize !== false && isExpand;

  const resizeHandleClassNames: HandleClassName = useMemo(() => {
    if (!canResizing) return {};

    return {
      [revesePlacement(placement)]: styles[`${revesePlacement(placement)}Handle`],
    };
  }, [canResizing, placement]);

  const resizing = {
    top: false,
    bottom: false,
    right: false,
    left: false,
    topRight: false,
    bottomRight: false,
    bottomLeft: false,
    topLeft: false,
    [revesePlacement(placement)]: true,
    ...(resize as Enable),
  };

  const defaultSize: Size = useMemo(() => {
    if (isVertical)
      return {
        width: '100%',
        height: DEFAULT_HEIGHT,
        ...customizeDefaultSize,
      };

    return {
      width: DEFAULT_WIDTH,
      height: '100%',
      ...customizeDefaultSize,
    };
  }, [isVertical]);

  const sizeProps = isExpand
    ? {
        minWidth: typeof minWidth === 'number' ? Math.max(minWidth, 0) : 280,
        minHeight: typeof minHeight === 'number' ? Math.max(minHeight, 0) : undefined,
        defaultSize,
        size: size as Size,
      }
    : isVertical
    ? {
        minHeight: 0,
        size: { height: 0 },
      }
    : {
        minWidth: 0,
        size: { width: 0 },
      };

  const { Arrow, className: arrowPlacement } = useMemo(() => {
    switch (placement) {
      case 'top':
        return { className: 'Bottom', Arrow: ChevronDown };
      case 'bottom':
        return { className: 'Top', Arrow: ChevronUp };
      case 'right':
        return { className: 'Left', Arrow: ChevronLeft };
      case 'left':
        return { className: 'Right', Arrow: ChevronRight };
    }
  }, [styles, placement]);

  const handler = (
    // @ts-ignore
    <Center
      // @ts-ignore
      className={cx(styles[`toggle${arrowPlacement}`])}
      style={{ opacity: isExpand ? (!pin ? 0 : undefined) : showHandlerWhenUnexpand ? 1 : 0 }}
    >
      <Center
        onClick={() => {
          setIsExpand(!isExpand);
        }}
        style={hanlderStyle}
      >
        <div
          className={styles.handlerIcon}
          style={{ transform: `rotate(${isExpand ? 180 : 0}deg)` }}
        >
          <Arrow size={16} strokeWidth={1.5} />
        </div>
      </Center>
    </Center>
  );

  const inner = (
    // @ts-ignore
    <Resizable
      {...sizeProps}
      className={styles.panel}
      enable={canResizing ? (resizing as Enable) : undefined}
      handleClasses={resizeHandleClassNames}
      onResize={(_, direction, ref, delta) => {
        onSizeDragging?.(delta, {
          width: ref.style.width,
          height: ref.style.height,
        });
      }}
      onResizeStart={() => {
        setShowExpand(false);
      }}
      onResizeStop={(e, direction, ref, delta) => {
        setShowExpand(true);
        onSizeChange?.(delta, {
          width: ref.style.width,
          height: ref.style.height,
        });
      }}
      style={style}
    >
      {children}
    </Resizable>
  );

  return (
    <div
      className={cx(
        styles.container,
        // @ts-ignore
        styles[mode === 'fixed' ? 'fixed' : `${placement}Float`],
        className,
      )}
      ref={ref}
      style={{ [`border${arrowPlacement}Width`]: 1 }}
    >
      {expandable && showExpand && handler}
      {destroyOnClose ? isExpand && inner : inner}
    </div>
  );
};

export default React.memo(DraggablePanel);
