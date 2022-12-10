import { languages, TLanguage } from '../../config/languages.config'

interface dynamicLocalizationProps {
	en: string
	ru?: string | null
	tr?: string | null
	pl?: string | null
	kg?: string | null
}

export const dynamicLocalization = ({
	en,
	ru,
	tr,
	pl,
	kg,
}): dynamicLocalizationProps => {
	const lang: string =
		typeof window !== 'undefined'
			? (localStorage.getItem('i18nextLng') as TLanguage)
			: languages[0]

	switch (lang) {
		case 'en':
			return en
		case 'ru':
			return ru || en
		case 'tr':
			return tr || en
		case 'pl':
			return pl || en
		case 'ky-KG':
			return kg || en
	}
}
