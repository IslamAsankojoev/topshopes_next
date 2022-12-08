import { text } from 'locales/default'
import { NextRouter, useRouter } from 'next/router'

type TypeLocales = keyof typeof text

export const useLocales = () => {
	const locale = useRouter().locale as TypeLocales
	return text[locale]
}

export const useTranslate = (object) => {
	const { locale } = useRouter()
	return object[locale]
}
