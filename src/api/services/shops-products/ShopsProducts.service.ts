import { axiosClassic } from 'src/api/interceptor'
import { getAllProductsUrl } from 'src/config/api.config'
import { toast } from 'react-toastify'
import { IProductPreview } from 'src/shared/types/product.types'
import { ResponseList } from 'src/shared/types/response.types'
import { getErrorMessage } from 'src/utils/getErrorMessage'

export const ShopsProductsService = {
	getList: async (params?: Record<string, string | number>) => {
		try {
			const { data } = await axiosClassic.get<ResponseList<IProductPreview>>(
				getAllProductsUrl(''),
				{ params }
			)
			return data
		} catch (error) {
			toast.error(`error ${getErrorMessage(error)}`)
			throw error
		}
	},
}
