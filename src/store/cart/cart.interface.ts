import { IProduct } from 'shared/types/product.types'

export type ICartInitial = {
	cart: ICartItem[]
	total_price: number
	total_items: number
}

export type ICartItem = IProduct & {
	qty?: number
}
