import { IShop } from './shop.types'

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
}

export type IProductPreview = Omit<
	IProduct,
	'brand' | 'unit' | 'variants' | 'reviews'
> & {
	thumbnail: string
	discount_price: string
	price: string
	discount: string
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
	size: ISize
	color: IColor
	stock: number
	status: 'available' | 'unavailable' | 'coming_soon'
	price: string
	discount: 0
	discount_price: string
	product: string
	thumbnail: string
	images: IImage[]
	attribute_values: IProductAttributeValue[]
}

export type IImage = {
	id: number | string
	product_variant: string
	image: string | File
}

export type IReview = {
	id: string
	product_variant: string
	user: { first_name: string; last_name: string; avatar: string }
	rating: number
	comment: string
	created_at: string
	product: number
	shop: string
}

export type IProductAttribute = {
	id: number
	name: string
	category: string
}

export type IProductAttributeValue = {
	id: number
	attribute: { id: number; name: string }
	value: string
	product_variant: number
}
