import { type HTMLAttributes } from 'react';

import translation from '@/../locales/en_US.json';
import i18nOptions from '@/../locales/options.json';

export type I18n = (typeof i18nOptions)[number]['value'];

export const resources = {
  translation,
} as const;

type TranslationKeys = keyof typeof translation;

export type Translation = {
  [key in TranslationKeys]: string;
};

export type DivProps = HTMLAttributes<HTMLDivElement>;

export type SvgProps = HTMLAttributes<SVGSVGElement>;

export type ImgProps = HTMLAttributes<HTMLImageElement>;

export type InputProps = HTMLAttributes<HTMLInputElement>;

export type TextAreaProps = HTMLAttributes<HTMLTextAreaElement>;
