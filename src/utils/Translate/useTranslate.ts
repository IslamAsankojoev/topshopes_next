import { text as ru } from 'locales/ru';
import { text as kg } from 'locales/kg';
import { text as tr } from 'locales/tr';
import { text as en } from 'locales/en';
import { text as pl } from 'locales/pl';
import { NextRouter, useRouter } from 'next/router';

const languages = {
  ru,
  kg,
  tr,
  en,
  pl,
};

type TypeLocales = keyof typeof languages;

export const useLocales = () => {
  const locale = useRouter().locale as TypeLocales;

  return languages[locale];
};

export const useTranslate = (object) => {
  const { locale } = useRouter();

  return object[locale];
};
