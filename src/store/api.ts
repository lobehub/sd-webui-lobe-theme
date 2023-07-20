import type { SelectProps } from 'antd';
import semver from 'semver';

import defualtLocaleOptions from '@/../locales/options.json';
import { homepage, version } from '@/../package.json';

import type { WebuiSetting } from './initialState';

export const DEFAULT_VERSION: string = version;
export const DEFAULT_LOCALE_OPTIONS: SelectProps['options'] = defualtLocaleOptions;
export const getSetting = async(): Promise<WebuiSetting | undefined> => {
  const res = await fetch('/lobe/config');
  const data = (await res.json()) as WebuiSetting;
  if (!data || (data as any)?.empty) return undefined;
  return data;
};

export const postSetting = async(setting: WebuiSetting) => {
  await fetch('/lobe/config', {
    body: JSON.stringify(setting),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
};

export const getVersion = async(): Promise<string> => {
  const res = await fetch('/lobe/package');
  const data = (await res.json()) as any;
  if (!data || data.empty || !data.version) return DEFAULT_VERSION;
  return data.version;
};

export const getLocaleOptions = async(): Promise<SelectProps['options']> => {
  const res = await fetch('/lobe/locales/options');
  const data = (await res.json()) as SelectProps['options'];
  if (!data || data?.length === 0) return DEFAULT_LOCALE_OPTIONS;
  return data;
};

export const getLatestVersion = async(): Promise<string> => {
  const res = await fetch(
    `https://api.github.com/repos/${homepage.replace('https://github.com/', '')}/releases/latest`,
  );
  const data = (await res.json()) as any;
  if (!data || !data.tag_name) return DEFAULT_VERSION;
  return semver.clean(data.tag_name as string) || DEFAULT_VERSION;
};
