import { IOrderShort } from './order.types'

export interface IUser {
	id: string
	first_name: string
	last_name: string
	email: string
	phone: string
	avatar: string
	verified: boolean
	orders: IOrderShort[]
	addresses: IAddress[]
	is_superuser: boolean
}

export interface IAddress {
	id: string
	city: string
	country: string
	street: string
	phone: string
}
