import { getErrorMessage } from 'utils/getErrorMessage';
import { toast } from 'react-toastify';
import { instance } from 'api/interceptor'
import { getBrandsTypesUrlAdmin } from 'config/api.config'
import { IBrandTypes } from 'shared/types/brand-types.types'

export const BrandTypesService = {
	getBrandsTypes: async () => {
		try {
			const response = await instance.get(getBrandsTypesUrlAdmin(''))
			return response.data
		} catch (error) {
			toast.error(`brand types: ${getErrorMessage(error)}`)
			throw error
		}
	},
	getBrandTypes: async (id: string) => {
		try {
			const response = await instance.get(getBrandsTypesUrlAdmin(`${id}/`))
			return response.data
		} catch (error) {
			toast.error(`brand types: ${getErrorMessage(error)}`)
			throw error
		}
	},
	updateBrandTypes: async (id: string, data: IBrandTypes) => {
		try {
			const response = await instance.patch(
				getBrandsTypesUrlAdmin(`${id}/`),
				data
			)
			return response.data
		} catch (error) {
			toast.error(`brand types: ${getErrorMessage(error)}`)
			throw error
		}
	},
	createBrandTypes: async (data: IBrandTypes) => {
		try {
			const response = await instance.post(getBrandsTypesUrlAdmin(''), data)
			return response.data
		} catch (error) {
			toast.error(`brand types: ${getErrorMessage(error)}`)
			throw error
		}
	},
	deleteBrandTypes: async (id: string) => {
		try {
			const response = await instance.delete(getBrandsTypesUrlAdmin(`${id}/`))
			return response.data
		} catch (error) {
			toast.error(`brand types: ${getErrorMessage(error)}`)
			throw error
		}
	},
}
