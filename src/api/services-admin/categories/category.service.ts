import { instance } from 'api/interceptor'
import { getCategoriesUrlAdmin } from 'config/api.config'

export const CategoriesService = {
	getCategories: async () => {
		try {
			const response = await instance.get(getCategoriesUrlAdmin(''))
			return response.data
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
