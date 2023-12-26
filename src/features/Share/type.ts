import { SegmentedProps } from 'antd';

export enum ImageType {
  JPG = 'jpg',
  PNG = 'png',
  SVG = 'svg',
  WEBP = 'webp',
}

export interface FieldType {
  imageType: ImageType;
  showAllImages: boolean;
  showConfig: boolean;
  showNegative: boolean;
  title: string;
  withBackground: boolean;
  withFooter: boolean;
}

export const imageTypeOptions: SegmentedProps['options'] = [
  {
    label: 'JPG',
    value: ImageType.JPG,
  },
  {
    label: 'PNG',
    value: ImageType.PNG,
  },
  {
    label: 'SVG',
    value: ImageType.SVG,
  },
  {
    label: 'WEBP',
    value: ImageType.WEBP,
  },
];
