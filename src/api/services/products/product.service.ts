import { IProduct } from 'shared/types/product.types'
import { getProductsUrl } from 'config/api.config'
import { axiosClassic } from 'api/interceptor'
import { toast } from 'react-toastify'
import { getErrorMessage } from 'utils/getErrorMessage'

export const ProductService = {
	getProducts: async (): Promise<IProduct[]> => {
		try {
			const response = await axiosClassic.get(getProductsUrl(''))
			return response.data
		}catch (error) {
			toast.error(`products: ${getErrorMessage(error)}`)
			throw error
		}
	},
}
