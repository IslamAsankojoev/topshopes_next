import { instance } from 'api/interceptor'
import { getCategoriesUrlAdmin } from 'config/api.config'
import { ICategory } from '../../../shared/types/product.types'

export const CategoriesService = {
	getCategories: async () => {
		try {
			const { data } = await instance.get<ICategory[]>(
				getCategoriesUrlAdmin('')
			)
			return data
		} catch (error) {
			throw error
		}
	},
	getCategory: async (id: string) => {
		try {
			const response = await instance.get(getCategoriesUrlAdmin(`${id}/`))
			return response.data
		} catch (error) {
			throw error
		}
	},
	updateCategory: async (id: string, data: any) => {
		try {
			const response = await instance.patch(
				getCategoriesUrlAdmin(`${id}/`),
				data
			)
			return response.data
		} catch (error) {
			throw error
		}
	},
	createCategory: async (data: any) => {
		try {
			const response = await instance.post(getCategoriesUrlAdmin(''), data)
			return response.data
		} catch (error) {
			throw error
		}
	},
	deleteCategory: async (id: string) => {
		try {
			const response = await instance.delete(getCategoriesUrlAdmin(`${id}/`))
			return response.data
		} catch (error) {
			throw error
		}
	},
}
