import type { SelectProps } from 'antd';

import defualtLocaleOptions from '@/../locales/options.json';
import { version } from '@/../package.json';

import type { WebuiSetting } from './initialState';

export const DEFAULT_VERSION: string = version;
export const DEFAULT_LOCALE_OPTIONS: SelectProps['options'] = defualtLocaleOptions;
/** fetch() that gives up after `ms` instead of hanging the start-up. */
const fetchWithTimeout = async(url: string, ms: number, init?: RequestInit) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
};

export const getSetting = async(): Promise<WebuiSetting | undefined> => {
  try {
    const res = await fetchWithTimeout('/lobe/config', 10_000);
    // the theme's routes answer 404 until the WebUI has added them: no setting yet, not a setting
    if (!res.ok) return undefined;
    const data = (await res.json()) as WebuiSetting;
    if (!data || (data as any)?.empty) return undefined;
    return data;
  } catch {
    return undefined;
  }
};

export const postSetting = async(setting: WebuiSetting) => {
  try {
    await fetch('/lobe/config', {
      body: JSON.stringify(setting),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  } catch {
    // saving is best effort: the setting is also kept in localStorage
  }
};

export const getVersion = async(): Promise<string> => {
  try {
    const res = await fetchWithTimeout('/lobe/package', 10_000);
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

export const getPrompt = async(): Promise<PromptData> => {
  const res = await fetch('/lobe/prompt');
  const data = (await res.json()) as any;
  return data;
};

export const getLocaleOptions = async(): Promise<SelectProps['options']> => {
  try {
    const res = await fetchWithTimeout('/lobe/locales/options', 10_000);
    const data = (await res.json()) as SelectProps['options'];
    if (!data || data?.length === 0) return DEFAULT_LOCALE_OPTIONS;
    return data;
  } catch {
    return DEFAULT_LOCALE_OPTIONS;
  }
};
