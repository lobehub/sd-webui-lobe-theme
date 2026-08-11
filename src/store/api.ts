import type { SelectProps } from 'antd';
import semver from 'semver';

import defualtLocaleOptions from '@/../locales/options.json';
import { version } from '@/../package.json';
import { GITHUB_REPO_URL } from '@/const/url';

import type { WebuiSetting } from './initialState';

export const DEFAULT_VERSION: string = version;
export const DEFAULT_LOCALE_OPTIONS: SelectProps['options'] = defualtLocaleOptions;
export const getSetting = async (): Promise<WebuiSetting | undefined> => {
  try {
    const res = await fetch('/lobe/config');
    if (!res.ok) return undefined;
    const data = (await res.json()) as WebuiSetting & { empty?: boolean; setting?: WebuiSetting };
    if (!data || data.empty) return undefined;
    // Support export-wrapper shape if someone dropped it into the root file
    if (data.setting && typeof data.setting === 'object') {
      return data.setting;
    }
    return data;
  } catch {
    return undefined;
  }
};

export const postSetting = async (setting: WebuiSetting) => {
  const res = await fetch('/lobe/config', {
    body: JSON.stringify(setting),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error(`Failed to save lobe config: ${res.status}`);
  }
};

export const getVersion = async (): Promise<string> => {
  try {
    const res = await fetch('/lobe/package');
    const data = (await res.json()) as any;
    if (!data || data.empty || !data.version) return DEFAULT_VERSION;
    return data.version;
  } catch {
    return DEFAULT_VERSION;
  }
};

interface PromptData {
  [key: string]: {
    children: {
      [key: string]: {
        children: {
          [key: string]: {
            langName: string;
            name: string;
          };
        };
        langName: string;
        name: string;
      };
    };
    langName: string;
    name: string;
  };
}

export const getPrompt = async (): Promise<PromptData> => {
  const res = await fetch('/lobe/prompt');
  const data = (await res.json()) as any;
  return data;
};

export const getLocaleOptions = async (): Promise<SelectProps['options']> => {
  try {
    const res = await fetch('/lobe/locales/options');
    if (!res.ok) return DEFAULT_LOCALE_OPTIONS;
    const data = (await res.json()) as SelectProps['options'];
    if (!data || data?.length === 0) return DEFAULT_LOCALE_OPTIONS;
    return data;
  } catch {
    return DEFAULT_LOCALE_OPTIONS;
  }
};

export const getLatestVersion = async (): Promise<string> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_URL.replace(
        'https://github.com/',
        '',
      )}/releases/latest`,
      { signal: controller.signal },
    );
    if (!res.ok) return DEFAULT_VERSION;
    const data = (await res.json()) as any;
    if (!data || !data.tag_name) return DEFAULT_VERSION;
    return semver.clean(data.tag_name as string) || DEFAULT_VERSION;
  } finally {
    clearTimeout(timeout);
  }
};
