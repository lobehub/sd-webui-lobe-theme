import semver from 'semver';

import { homepage, version } from '@/../package.json';
import { WebuiSetting } from '@/store/AppState';

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
  if (!data || data.empty || !data.version) return version;
  return data.version;
};

export const getLatestVersion = async(): Promise<string> => {
  const res = await fetch(
    `https://api.github.com/repos/${homepage.replace('https://github.com/', '')}/releases/latest`,
  );
  const data = (await res.json()) as any;
  if (!data || !data.tag_name) return version;
  return semver.clean(data.tag_name as string) || version;
};
