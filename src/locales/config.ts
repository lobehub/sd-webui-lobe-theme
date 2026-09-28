import i18next from 'i18next';
import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import enUS from '@/../locales/en_US.json';
import { SETTING_KEY, type WebuiSetting } from '@/store';

const readLocalSetting = (): WebuiSetting | undefined => {
  try {
    return JSON.parse(localStorage.getItem(SETTING_KEY) || 'null') || undefined;
  } catch {
    return undefined;
  }
};
const localSetting = readLocalSetting();

i18next
  .use(initReactI18next)
  .use(HttpBackend)
  .init<HttpBackendOptions>({
    backend: {
      loadPath: '/lobe/locales/{{lng}}',
    },
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en_US',
    lng: localSetting?.i18n || 'en_US',
    // English ships inside the bundle: if the server is slow to answer the
    // first language request, the UI still shows words instead of keys.
    partialBundledLanguages: true,
    resources: { en_US: { translation: enUS } },
  });
