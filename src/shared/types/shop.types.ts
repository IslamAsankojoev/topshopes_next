import { IProduct, IProductPreview } from './product.types'

export interface IShop {
	id: string
	user?: string
	name: string
	slug: string
	email: string
	address: string
	verified: boolean
	phone: string
	cover_picture: string
	profile_picture: string
	socialLinks: ILinks[]
	products: IProductPreview[]
}

export interface ILinks {
	name: string
	link: string
}

export interface IShopForm {
	document: string
	status?: IShopRequestStatus
	INN: string
	short_name: string
	full_name: string
	registration_form?: INds
	address: string
	owner: string
	bank_account: string
	bik: string
	shop_name: string
}

export type IShopRequestStatus = 'moderation' | 'approved' | 'rejected'
export type INds = 'with_nds' | 'without_nds'
