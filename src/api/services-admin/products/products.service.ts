import { instance } from '../../interceptor'
import { getProductsUrlAdmin } from '../../../config/api.config'
import { IProduct } from '../../../shared/types/product.types'

export const AdminProductsService = {
	getProducts: async () => {
		try {
			const response = await instance.get(getProductsUrlAdmin(''))
			return response.data
		} catch (error) {
			throw error
		}
	},
	getProduct: async (id) => {
		try {
			const response = await instance.get(getProductsUrlAdmin(`${id}/`))
			return response.data
		} catch (error) {
			throw error
		}
	},
	createProduct: async (data) => {
		try {
			const response = await instance.post(getProductsUrlAdmin(''), data)
			return response.data
		} catch (error) {
			throw error
		}
	},
	updateProduct: async (id, data) => {
		try {
			const response = await instance.patch(getProductsUrlAdmin(`${id}/`), data)
			return response.data
		} catch (error) {
			throw error
		}
	},
	deleteProduct: async (id) => {
		try {
			const response = await instance.delete(getProductsUrlAdmin(`${id}/`))
			return response.data
		} catch (error) {
			throw error
		}
	},
}
