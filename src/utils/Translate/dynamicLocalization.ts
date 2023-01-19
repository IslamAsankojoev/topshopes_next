import Cookie from 'js-cookie';

import en from '../../../public/locales/en/common.json'
import kk from '../../../public/locales/kk/common.json'
import ky_KG from '../../../public/locales/ky-KG/common.json'
import ru from '../../../public/locales/ru/common.json'
import tr from '../../../public/locales/tr/common.json'



export const dynamicLocalization = (
  data: {
  ru: string, 
  en?: string, 
  tr?: string, 
  kg?: string, 
  kk?: string
  }) => {
  const lang = Cookie.get('i18nextLng') || 'ru'
  return data[lang == 'ky-KG' ?'kg' :lang] || data['ru']
};



const TRANSLATIONS = { en, kk, ky_KG, ru, tr };
export const commonTranslation = () => {
  const lang = Cookie.get('i18nextLng') || 'ru'
  const locale = lang == 'ky-Kg' ?'ky_KG' :lang

  const t = (keyString) => TRANSLATIONS[locale][keyString];

  return { t, locale };
}