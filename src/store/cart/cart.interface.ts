import { IProduct } from 'shared/types/product.types'

export type ICartInitial = {
	cart: ICartItem[]
	total_price: number
	total_items: number
}

export type ICartItem = Omit<
	IProduct,
	'brand' | 'shop' | 'unit' | 'reviews' | 'published' | 'slug'
> & {
	qty?: number
}
