import { Theme as AntdStyleTheme } from 'antd-style'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends AntdStyleTheme {}
}
