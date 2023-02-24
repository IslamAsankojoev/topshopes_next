import currency from "currency.js"

export const getCurrency = (price: string | number) => {
  if (!price) return null
  return currency(price, {
    separator: " ",
    symbol: 'c',
    pattern: "# !",
    precision: 0,
  }).format()
}