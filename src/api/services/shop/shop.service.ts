import { makeRequest } from 'api/interceptor'
import {
	getShopOrdersUrl,
	getShopProductsUrl,
	getShopUrl,
	getShopsUrl,
} from 'config/api.config'
import { toast } from 'react-toastify'

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
	getShopOrders: async (id: string) => {
		try {
			const response = await makeRequest().get(getShopOrdersUrl(id))
			return response.data
		} catch (error) {
			throw error
		}
	},
}

export const ShopService = CRUDservice(getShopUrl, 'Shop')
