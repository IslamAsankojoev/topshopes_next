import { axiosClassic } from 'api/interceptor'
import { getAllProductsUrl } from 'config/api.config'
import { toast } from 'react-toastify'
import { IProduct, IProductPreview } from 'shared/types/product.types'
import { getErrorMessage } from 'utils/getErrorMessage'

export const ShopsProductsService = {
	getList: async (params?: Record<string, string | number>) => {
		try {
			const { data } = await axiosClassic.get<IProductPreview[]>(
				getAllProductsUrl(''),
				{ params: { ...params } }
			)
			return data
		} catch (error) {
			toast.error(`error ${getErrorMessage(error)}`)
			throw error
		}
	},
}
