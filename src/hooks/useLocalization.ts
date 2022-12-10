import { useRouter } from 'next/router'

interface dynamicLocalizationProps {
	words: {
		en: string
		ru?: string
		tr?: string
		pl?: string
		kg?: string
	}
}

export const useLocalization = (words): dynamicLocalizationProps => {
	const { locale } = useRouter()
	if (locale === 'ky-KG') {
		return words.kg
	}
	return words[locale]
}
