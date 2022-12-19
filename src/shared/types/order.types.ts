export interface IOrder {
	id: string
	tax: number
	discount: number
	total_price: string
	is_delivered: boolean
	shipping_address: string
	status: 'PENDING' | 'DELIVERED' | 'CANCELLED' | 'PROCESSING'
	delivered_at: string
	items: IOrderItem[]
	created_at?: string
}

export interface IOrderShort {
	id: string
	status: 'PENDING' | 'DELIVERED' | 'CANCELLED' | 'PROCESSING'
	created_at: string
	total_price: string
}

export interface IOrderItem {
	product_image: string
	product_name: string
	product_price: string
	product_quantity: number
	order: string
}
