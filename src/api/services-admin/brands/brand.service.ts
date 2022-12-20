import { IBrand } from './../../../shared/types/brand.types'
import { instance } from 'api/interceptor'
import { getBrandsUrlAdmin } from 'config/api.config'
import { toast } from 'react-toastify'
import { getErrorMessage } from 'utils/getErrorMessage'

export const BrandsService = {
	getBrands: async () => {
		try {
			const response = await instance.get(getBrandsUrlAdmin('erfe/erefrefer/'))
			return response.data
		} catch (error) {
			toast.error(`brands: ${getErrorMessage(error)}`)
			throw error
		}
	},
	getBrand: async (id: string) => {
		try {
			const response = await instance.get(getBrandsUrlAdmin(`${id}/`))
			return response.data
		} catch (error) {
			toast.error(`brands: ${getErrorMessage(error)}`)
			throw error
		}
	},
	updateBrand: async (id: string, data: IBrand | FormData | any) => {
		try {
			const response = await instance.patch(getBrandsUrlAdmin(`${id}/`), data)
			return response.data
		} catch (error) {
			toast.error(`brands: ${getErrorMessage(error)}`)
			throw error
		}
	},
	createBrand: async (data: IBrand | FormData) => {
		try {
			const response = await instance.post(getBrandsUrlAdmin(''), data)
			return response.data
		} catch (error) {
			toast.error(`brands: ${getErrorMessage(error)}`)
			throw error
		}
	},
	deleteBrand: async (id: string) => {
		try {
			const response = await instance.delete(getBrandsUrlAdmin(`${id}/`))
			return response.data
		} catch (error) {
			toast.error(`brands: ${getErrorMessage(error)}`)
			throw error
		}
	},
}
