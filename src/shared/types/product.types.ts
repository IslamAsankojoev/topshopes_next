import { IShop } from './shop.types'

export type IProduct = {
	brand: IBrand
	id: string
	shop: IShop
	slug: string
	title: string
	category: ICategory
	rating: number
	unit: string
	variants: IProductVariant[]
	reviews: IReview[]
	published: boolean
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
	product: string
	thumbnail: string
	images: IImage[]
}

export type IImage = {
	id: number | string
	product_variant: string
	image: string | File
}

export type IReview = {
	id: string
	customer: string
	product: string
	rating: number
	published: boolean
	comment: string
}
