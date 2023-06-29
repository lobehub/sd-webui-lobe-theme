import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { SETTING_KEY, WebuiSetting } from '@/store';

import en from './lang/en';
import ja_JP from './lang/ja_JP';
import ko_KR from './lang/ko_KR';
import zh_CN from './lang/zh_CN';
import zh_HK from './lang/zh_HK';

const localSetting = JSON.parse(localStorage.getItem(SETTING_KEY) as any) as WebuiSetting;

i18next.use(initReactI18next).init({
  debug: process.env.NODE_ENV === 'development',
  fallbackLng: 'en',
  lng: localSetting?.i18n || 'en',
  resources: {
    en: {
      translation: en,
    },
    ja_JP: {
      translation: ja_JP,
    },
    ko_KR: {
      translation: ko_KR,
    },
    zh_CN: {
      translation: zh_CN,
    },
    zh_HK: {
      translation: zh_HK,
    },
  },
});
