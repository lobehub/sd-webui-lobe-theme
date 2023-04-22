import { DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from '@ant-design/icons'
import type { Enable, NumberSize, Size } from 're-resizable'
import { HandleClassName, Resizable } from 're-resizable'
import type { CSSProperties, FC, ReactNode } from 'react'
import { memo, useMemo } from 'react'
import { Center } from 'react-layout-kit'
import type { Props as RndProps } from 'react-rnd'
import useControlledState from 'use-merge-value'
import { useStyle } from './style'

export type placementType = 'right' | 'left' | 'top' | 'bottom'

export interface FixModePanelProps {
  /**
   * 位置，
   * 使用固定模式或者浮动窗口
   */
  mode?: 'fixed' | 'float'

  /**
   * 固定模式下面板的朝向，默认放置在右侧
   * @default right
   */
  placement: placementType

  /**
   * 最小宽度
   */
  minWidth?: number
  /**
   * 最小高度
   */
  minHeight?: number
  /**
   * 控制可缩放区域
   */
  resize?: RndProps['enableResizing']
  /**
   * 面板尺寸
   *
   */
  size?: Partial<Size>
  onSizeChange?: (delta: NumberSize, size?: Size) => void
  /**
   * 当用户在拖拽过程中触发
   * @param delta
   * @param size
   */
  onSizeDragging?: (delta: NumberSize, size?: Size) => void
  /**
   * 是否可展开
   * @default true
   */
  expandable?: boolean
  /**
   * 当前是否是展开态
   */
  isExpand?: boolean
  /**
   * 展开是否可以变更
   * @param expand
   */
  onExpandChange?: (expand: boolean) => void
  /**
   * 面板位置
   * 受控模式
   */
  position?: RndProps['position']
  /**
   * 面板默认尺寸
   * 固定模式下： width 320px height 100%
   * 浮动模式下：width 320px height 400px
   */
  defaultSize?: Partial<Size>
  /**
   * 面板默认位置悬浮模式下有效
   * @default [100,100]
   */
  defaultPosition?: RndProps['position']
  /**
   * 位置变更回调
   */
  onPositionChange?: (position: RndProps['position']) => void
  /**
   * 样式
   */
  style?: CSSProperties
  className?: string
  /**
   * 内容
   */
  children: ReactNode
  /**
   * 类名前缀
   */
  prefixCls?: string
  maxHeight?: boolean
}

const DEFAULT_HEIGHT = 150
const DEFAULT_WIDTH = 400

const revesePlacement = (placement: placementType) => {
  switch (placement) {
    case 'bottom':
      return 'top'
    case 'top':
      return 'bottom'
    case 'right':
      return 'left'
    case 'left':
      return 'right'
  }
}

export const FixMode: FC<FixModePanelProps> = memo<FixModePanelProps>(
  ({
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
    isExpand: expand,
    onExpandChange,
    className,
    maxHeight,
  }) => {
    const prefixCls = 'draggable-panel'

    const isVertical = placement === 'top' || placement === 'bottom'

    const { styles, cx } = useStyle({ prefix: prefixCls, maxHeight })

    const [isExpand, setIsExpand] = useControlledState(true, {
      value: expand,
      onChange: onExpandChange,
    })

    // 只有配置了 resize 和 isExpand 属性后才可拖拽
    const canResizing = resize !== false && isExpand

    const resizeHandleClassNames: HandleClassName = useMemo(() => {
      if (!canResizing) return {}

      return {
        [revesePlacement(placement)]: styles[`${revesePlacement(placement)}Handle`],
      }
    }, [canResizing, placement])

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
    }

    const defaultSize: Size = useMemo(() => {
      if (isVertical)
        return {
          width: '100%',
          height: DEFAULT_HEIGHT,
          ...customizeDefaultSize,
        }

      return {
        width: DEFAULT_WIDTH,
        height: '100%',
        ...customizeDefaultSize,
      }
    }, [isVertical])

    const sizeProps = isExpand
      ? {
          minWidth: typeof minWidth === 'number' ? Math.max(minWidth, 0) : 280,
          minHeight: typeof minHeight === 'number' ? Math.max(minHeight, 0) : undefined,
          defaultSize,
          size: size as Size,
          style,
        }
      : {
          minWidth: 0,
          minHeight: 0,
          size: { width: 0, height: 0 },
        }

    const { Arrow, className: arrowPlacement } = useMemo(() => {
      switch (placement) {
        case 'top':
          return { className: 'Bottom', Arrow: DownOutlined }
        case 'bottom':
          return { className: 'Top', Arrow: UpOutlined }
        case 'right':
          return { className: 'Left', Arrow: LeftOutlined }
        case 'left':
          return { className: 'Right', Arrow: RightOutlined }
      }
    }, [styles, placement])

    return (
      <div className={cx(styles.container, className)} style={{ [`border${arrowPlacement}Width`]: 1 }}>
        {expandable && (
          <Center
            // @ts-ignore
            className={cx(styles[`toggle${arrowPlacement}`])}
            onClick={() => {
              setIsExpand(!isExpand)
            }}
            style={{ opacity: isExpand ? undefined : 1 }}
          >
            <Arrow rotate={isExpand ? 180 : 0} />
          </Center>
        )}
        {
          <Resizable
            {...sizeProps}
            className={styles.fixed}
            enable={canResizing ? (resizing as Enable) : undefined}
            handleClasses={resizeHandleClassNames}
            onResizeStop={(e, direction, ref, delta) => {
              onSizeChange?.(delta, {
                width: ref.style.width,
                height: ref.style.height,
              })
            }}
            onResize={(_, direction, ref, delta) => {
              onSizeDragging?.(delta, {
                width: ref.style.width,
                height: ref.style.height,
              })
            }}
          >
            {children}
          </Resizable>
        }
      </div>
    )
  }
)
