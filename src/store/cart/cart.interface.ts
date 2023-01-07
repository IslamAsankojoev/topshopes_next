import { IProduct } from 'shared/types/product.types'

export type ICartInitial = {
	cart: ICartItem[]
	total_price: number
	total_items: number
}

export type ICartItem = Omit<
	IProduct,
	'id' | 'brand' | 'shop' | 'unit' | 'reviews' | 'published'
> & {
	qty?: number
}
