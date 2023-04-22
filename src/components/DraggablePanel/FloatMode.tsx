import type { Enable, NumberSize, Size } from 're-resizable'
import { HandleClassName } from 're-resizable'
import type { CSSProperties, FC, ReactNode } from 'react'
import { memo, useMemo } from 'react'
import type { Position, Props as RndProps } from 'react-rnd'
import { Rnd } from 'react-rnd'
import { useStyle } from './style'

export interface FloatProps {
  /**
   * 位置，
   * 使用固定模式或者浮动窗口
   */
  mode?: 'fixed' | 'float'

  /**
   * 面板的朝向，默认是 左右模式
   * @default horizontal
   */
  direction?: 'vertical' | 'horizontal'

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

  canResizing?: boolean
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
  /**
   * 类名
   */
  className?: string
  /**
   * 内容
   */
  children: ReactNode
  /**
   * 类名前缀
   */
  prefixCls?: string
}

const DEFAULT_HEIGHT = 300
const DEFAULT_WIDTH = 400

export const FloatMode: FC<FloatProps> = memo(
  ({
    children,
    direction,
    resize,
    style,
    position,
    onPositionChange,
    size,
    defaultSize: customizeDefaultSize,
    defaultPosition: customizeDefaultPosition,
    minWidth = 280,
    minHeight = 200,
    prefixCls,
    canResizing,
  }) => {
    const { styles } = useStyle({ prefix: prefixCls, maxHeight: false })

    const resizeHandleClassNames: HandleClassName = useMemo(() => {
      if (!canResizing) return {}

      return {
        right: styles.rightHandle,
        left: styles.leftHandle,
        top: styles.topHandle,
        bottom: styles.bottomHandle,
      }
    }, [canResizing, direction])

    const resizing = useMemo(() => {
      if (canResizing) return resize

      return {
        top: true,
        bottom: true,
        right: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
        ...(resize as Enable),
      }
    }, [canResizing, resize])

    const defaultSize: Size = {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      ...customizeDefaultSize,
    }

    const defaultPosition: Position = {
      x: 100,
      y: 100,
      ...customizeDefaultPosition,
    }

    const sizeProps = {
      minWidth: Math.max(minWidth, 0),
      minHeight: Math.max(minHeight, 0),
      defaultSize,
      size: size as Size,
      style,
    }

    return (
      <Rnd
        position={position}
        resizeHandleClasses={resizeHandleClassNames}
        default={{
          ...defaultPosition,
          ...defaultSize,
        }}
        onDragStop={(e, data) => {
          onPositionChange?.({ x: data.x, y: data.y })
        }}
        bound={'parent'}
        enableResizing={resizing}
        {...sizeProps}
        className={styles.float}
      >
        {children}
      </Rnd>
    )
  }
)
