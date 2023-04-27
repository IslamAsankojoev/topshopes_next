import { axiosAuth } from 'src/api/interceptor'
import {
	getShopOrdersUrl,
	getShopProductsUrl,
	getShopUrl,
	getShopsUrl,
} from 'src/config/api.config'

import { CRUDservice } from './../../crud.service'

export const ShopsService = {
	...CRUDservice(getShopsUrl, 'Shop'),
	getShopProducts: async (id: string) => {
		try {
			const response = await axiosAuth().get(getShopProductsUrl(id))
			return response.data
		} catch (error) {
			throw error
		}
	},
	getShopOrders: async (params: Record<string, string | number>) => {
		try {
			const response = await axiosAuth(true).get(getShopOrdersUrl(''), {
				params,
			})
			return response.data
		} catch (error) {
			throw error
		}
	},
	getShopOrder: async (id: string) => {
		try {
			const response = await axiosAuth(true).get(getShopOrdersUrl(id))
			return response.data
		} catch (error) {
			throw error
		}
	},
	updateShopOrder: async (id: string, data: FormData | any) => {
		try {
			const response = await axiosAuth(true).patch(getShopOrdersUrl(id), data)
			return response.data
		} catch (error) {
			throw error
		}
	},
	getShopReviews: async () => {
		try {
			const response = await axiosAuth(true).get(getShopUrl('reviews/'))
			return response.data
		} catch (error) {
			throw error
		}
	},
}

export const ShopService = CRUDservice(getShopUrl, 'Shop', true, false)
