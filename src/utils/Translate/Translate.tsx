import { text } from 'locales/default';
import { useRouter } from 'next/router';
import React from 'react';
import { text as ru } from 'locales/ru';
import { text as en } from 'locales/en';
import { text as kg } from 'locales/kg';
import { text as tr } from 'locales/tr';
import { text as pl } from 'locales/pl';

const Translate: React.FC<{ children: any; defaultText?: any }> = ({ children, defaultText }) => {
  const { locale } = useRouter();
  const text = {
    ru,
    en,
    kg,
    tr,
    pl,
  };

  return <>{text[locale][children]}</>;
};

export default Translate;
