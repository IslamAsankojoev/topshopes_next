import { IProductVariant } from 'shared/types/product-variant.types';

export type IProduct = {
	brand: IBrand
	id: string
	published: boolean
	shop: string
	slug: string
	title: string
	unit: string
	rating: number | string

	variants: IProductVariant[]
}

export type IColors = {
	id: number
	name: string
	color: string
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
