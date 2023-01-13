import { makeRequest } from 'api/interceptor'
import { getShopProductsUrl, getShopsUrl, getShopUrl } from 'config/api.config'
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
}

export const ShopService = CRUDservice(getShopUrl, 'Shop')
