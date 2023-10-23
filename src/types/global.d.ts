import type { LobeCustomStylish, LobeCustomToken } from '@lobehub/ui';
import 'antd-style';

declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomToken extends LobeCustomToken {}
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomStylish extends LobeCustomStylish {}
}
