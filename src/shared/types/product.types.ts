export type IProduct = {
	id: string
	slug: string
	shop: string
	title: string
	brand: string
	price: string
	size: string[]
	colors: IColors[]
	discount: number
	thumbnail: string
	images: string[]
	categories: [string]
	status: string
	rating: number
	unit: string
	published: boolean
}

export type IColors = {
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
