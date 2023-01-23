import { IProductVariant } from './product.types'
import { IShop } from './shop.types'
import { IAddress } from './user.types'

export interface IOrder {
	id: string
	quantity: number
	tax: number
	address: IAddress
	total_price: string
	shipping_address: string
	delivered_at: string
	created_at?: string
	status: IOrderStatus
	product: IOrderProductShort
	product_variant: IProductVariant
}

export type IOrderStatus =
	| 'pending'
	| 'paid'
	| 'delivering'
	| 'delivered'
	| 'received'
	| 'cancelled'

export interface IOrderShort {
	id: string
	status: IOrderStatus
	created_at: string
	total_price: string
}

export interface IOrderItem {
	product_image: string
	product_name: string
	product_price: string
	product_quantity: number
	order: string
}

export interface IOrderProductShort {
	category: string
	id: number
	name: string
	rating: string
	shop: IShop
	slug: string
}
