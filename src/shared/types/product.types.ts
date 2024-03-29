import { IShop } from './shop.types'
import { IUser } from './user.types'

export type IProduct = {
	brand: IBrand
	id: string
	shop: IShop
	slug: string
	name: string
	category: ICategory
	rating: number
	unit: string
	variants: IProductVariant[]
	reviews: IReview[]
	description: string
	is_published: boolean
	created_at: string
	sold_quantity: number
}

export type IProductPreview = Pick<
	IProduct,
	| 'id'
	| 'slug'
	| 'name'
	| 'category'
	| 'rating'
	| 'description'
	| 'shop'
	| 'is_published'
	| 'created_at'
> & {
	thumbnail: string
	discount_price: string
	price: string
	discount: string
	nodeRef?: any
}

export type IColor = {
	id: number
	name: string
	color: string
}

export interface ISize {
	id: number
	name: string
}

export type ICategory = {
	id: string
	name: string
	icon: string
	image: string
	slug: string
	parent: string
	description: string
	featured: boolean
	attributes: IProductAttribute[]
	tax: number
}

export type IBrand = {
	id: string
	name: string
	slug: string
	image: string
	featured: boolean
	type: number
}

export type IProductVariant = {
	id?: string
	status?: IProductVariantStatus
	stock?: number
	overall_price?: string
	price: string
	discount_price?: string
	discount: number
	product?: string
	thumbnail: string
	images: IImage[]
	attribute_values?: IProductAttributeValue[]
	nodeRef?: any
	ordering: null | number
}

export type IProductVariantStatus = 'available' | 'unavailable'
export type IImage = {
	id: number | string
	product_variant: string
	image: string | File
	nodeRef?: any
}

export type IReview = {
	id: string
	product_variant: string
	user: IUser
	rating: number
	comment: string
	created_at: string
	product: string
	shop: string
}

export type IProductAttribute = {
	id: number
	name: string
	category: string
}

export type IProductAttributeValue = {
	available?: boolean
	id?: string | number
	attribute?: IAttribute
	value?: string
	product_variant?: string | number
}

export type IAttribute = {
	name?: string
	id?: number
}
