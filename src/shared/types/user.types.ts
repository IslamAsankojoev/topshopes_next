import { IOrderShort } from './order.types'
import { IShop } from './shop.types'

export interface IUser {
	id: string
	first_name: string
	last_name: string
	email: string
	phone: string
	avatar: string
	verified: boolean
	is_superuser: boolean
	is_seller: boolean
	shop?: IShop
}

export interface IAddress {
	id: string
	city: string
	country: string
	street: string
	phone: string
}
