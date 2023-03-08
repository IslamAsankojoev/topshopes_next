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
	published: boolean
	description: string
}

export type IProductPreview = Pick<IProduct,
 | 'id' 
 | 'slug'
 | 'name'
 | 'category'
 | 'rating'
 | 'published'
 | 'description'
 | 'shop'
 >
& {
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
	id: string
	status: IProductVariantStatus
	stock: number
	overall_price: string
	price: string
	discount_price: string
	discount: 0
	product: string
	thumbnail: string
	images: IImage[]
	attribute_values: IProductAttributeValue[]
	nodeRef: any
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
	id: string | number
	attribute: { name: string; id: number }
	value: string
	product_variant: string | number
}
