import { makeRequest } from 'api/interceptor'
import { getShopProductsUrl, getShopUrl } from 'config/api.config'
import { toast } from 'react-toastify'

import { CRUDservice } from './../../crud.service'

export const ShopService = {
	...CRUDservice(getShopUrl, 'Shop'),
	getShopProducts: async (id: string) => {
		try {
			const response = await makeRequest().get(getShopProductsUrl(id))
			return response.data
		} catch (error) {
			throw error
		}
	},
}
