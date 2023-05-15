import currency from 'currency.js'

export const getCurrency = (
	price: string | number,
	allowZero: boolean = false
) => {
	if (!price && !allowZero) return null
	return currency(price, {
		separator: ' ',
		symbol: 'KGS',
		pattern: '# !',
		precision: 0,
	}).format()
}
