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
