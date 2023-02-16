import { makeRequest } from 'api/interceptor'
import {
	getShopOrdersUrl,
	getShopProductsUrl,
	getShopUrl,
	getShopsUrl,
} from 'config/api.config'

import { CRUDservice } from './../../crud.service'

export const ShopsService = {
	...CRUDservice(getShopsUrl, 'Shop'),
	getShopProducts: async (id: string) => {
		try {
			const response = await makeRequest().get(getShopProductsUrl(id))
			return response.data
		} catch (error) {
			throw error
		}
	},
	getShopOrders: async (params: Record<string, string | number>) => {
		try {
			const response = await makeRequest(true).get(getShopOrdersUrl(''), {
				params,
			})
			return response.data
		} catch (error) {
			throw error
		}
	},
	getShopOrder: async (id: string) => {
		try {
			const response = await makeRequest(true).get(getShopOrdersUrl(id))
			return response.data
		} catch (error) {
			throw error
		}
	},
	updateShopOrder: async (id: string, data: FormData | any) => {
		try {
			const response = await makeRequest(true).patch(getShopOrdersUrl(id), data)
			return response.data
		} catch (error) {
			throw error
		}
	},
	getShopReviews: async () => {
		try {
			const response = await makeRequest(true).get(getShopUrl('reviews/'))
			return response.data
		} catch (error) {
			throw error
		}
	},
}

export const ShopService = CRUDservice(getShopUrl, 'Shop')
