import Cookie from 'js-cookie'

export const dynamicLocalization = (data: {
	ru: string
	en?: string
	tr?: string
	kg?: string
	kk?: string
}) => {
	const lang = Cookie.get('i18nextLng') || 'ru'
	return data?.[lang == 'ky-KG' ? 'kg' : lang] || data?.['ru']
}
