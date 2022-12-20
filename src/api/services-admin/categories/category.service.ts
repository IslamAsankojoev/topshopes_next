import { getErrorMessage } from 'utils/getErrorMessage';
import { ICategory } from 'shared/types/product.types';
import { instance } from 'api/interceptor'
import { getCategoriesUrlAdmin } from 'config/api.config'
import { toast } from 'react-toastify'

export const CategoriesService = {
	getCategories: async () => {
		try {
			const response = await instance.get(getCategoriesUrlAdmin(''))
			return response.data
		} catch (error) {
			toast.error(`categories: ${getErrorMessage(error)}`)
			throw error
		}
	},
	getCategory: async (id: string) => {
		try {
			const response = await instance.get(getCategoriesUrlAdmin(`${id}/`))
			return response.data
		} catch (error) {
			toast.error(`categories: ${getErrorMessage(error)}`)
			throw error
		}
	},
	updateCategory: async (id: string, data: ICategory | FormData | any) => {
		try {
			const response = await instance.patch(
				getCategoriesUrlAdmin(`${id}/`),
				data
			)
			return response.data
		} catch (error) {
			toast.error(`categories: ${getErrorMessage(error)}`)
			throw error
		}
	},
	createCategory: async (data: ICategory | FormData) => {
		try {
			const response = await instance.post(getCategoriesUrlAdmin(''), data)
			return response.data
		} catch (error) {
			toast.error(`categories: ${getErrorMessage(error)}`)
			throw error
		}
	},
	deleteCategory: async (id: string) => {
		try {
			const response = await instance.delete(getCategoriesUrlAdmin(`${id}/`))
			return response.data
		} catch (error) {
			toast.error(`categories: ${getErrorMessage(error)}`)
			throw error
		}
	},
}
