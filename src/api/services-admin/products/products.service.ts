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
	getProduct: async (id: string) => {
		try {
			const response = await instance.get(getProductsUrlAdmin(`${id}/`))
			return response.data
		} catch (error) {
			throw error
		}
	},
	createProduct: async (data: IProduct | FormData) => {
		try {
			const response = await instance.post(getProductsUrlAdmin(''), data)
			return response.data
		} catch (error) {
			throw error
		}
	},
	updateProduct: async (id: string, data: IProduct | FormData | any) => {
		try {
			const response = await instance.patch(getProductsUrlAdmin(`${id}/`), data)
			return response.data
		} catch (error) {
			throw error
		}
	},
	deleteProduct: async (id: string) => {
		try {
			const response = await instance.delete(getProductsUrlAdmin(`${id}/`))
			return response.data
		} catch (error) {
			throw error
		}
	},
}
