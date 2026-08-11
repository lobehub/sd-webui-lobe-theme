import i18next from 'i18next';
import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import type { WebuiSetting } from '@/store/initialState';

/** Keep in sync with SETTING_KEY in store/action.ts — avoid circular import via @/store */
const SETTING_KEY = 'SD-LOBE-SETTING';

const readLocalI18n = (): string => {
  try {
    const raw = localStorage.getItem(SETTING_KEY);
    if (!raw) return 'en_US';
    const localSetting = JSON.parse(raw) as WebuiSetting;
    return localSetting?.i18n || 'en_US';
  } catch {
    return 'en_US';
  }
};

i18next
  .use(initReactI18next)
  .use(HttpBackend)
  .init<HttpBackendOptions>({
    backend: {
      loadPath: '/lobe/locales/{{lng}}',
    },
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en_US',
    lng: readLocalI18n(),
  });
