export type ICartInitial = {
	cart: ICartItem[]
	total_price: number
	total_items: number
}

export type ICartItem = {
	qty?: number
	title: string
	price: string
	imgUrl?: string
	id: string
}
