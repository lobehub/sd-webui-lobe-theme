import i18next from 'i18next';
import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { SETTING_KEY, type WebuiSetting } from '@/store';

const localSetting = JSON.parse(localStorage.getItem(SETTING_KEY) as any) as WebuiSetting;

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
  });
