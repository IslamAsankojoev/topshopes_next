import { IProduct } from 'src/shared/types/product.types'

export type ICartInitial = {
	cart: ICartItem[]
	total_price: number
	total_items: number
}

export type ICartItem = Omit<
	IProduct,
	'brand'  | 'unit' | 'reviews' | 'published'
> & {
	qty?: number
}
