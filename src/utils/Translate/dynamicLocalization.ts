import Cookie from 'js-cookie'

interface dynamicLocalizationProps {
	words: {
		en: string
		ru?: string
		tr?: string
		pl?: string
		kg?: string
	}
}

export const dynamicLocalization = (words): dynamicLocalizationProps => {
	const locale = Cookie.get('i18nextLng')
	if (locale === 'ky-KG') {
		return words.kg || words.en
	}
	return words[locale] || words.en
}
