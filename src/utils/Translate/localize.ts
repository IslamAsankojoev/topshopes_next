import Cookie from 'js-cookie'

export const localize = (data: {
	ru: string
	en?: string
	tr?: string
	kg?: string
	kz?: string
}) => {
	const lang = Cookie.get('i18nextLng') || 'ru'
	return data?.[lang == 'ky-KG' ? 'kg' : lang] || data?.['ru']
}
