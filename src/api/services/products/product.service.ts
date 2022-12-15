import { IProduct } from 'shared/types/product.types'
import { getProductsUrl } from 'config/api.config'
import { axiosClassic } from 'api/interceptor'

export const ProductService = {
	getProducts: async (): Promise<IProduct[]> => {
		const response = await axiosClassic.get(getProductsUrl(''))
		return response.data
	},
}
