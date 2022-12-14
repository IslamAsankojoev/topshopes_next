import { instance } from 'api/interceptor'
import { getBrandsUrlAdmin } from 'config/api.config'

export const BrandsService = {
	getBrands: async () => {
		try {
			const response = await instance.get(getBrandsUrlAdmin(''))
			return response.data
		} catch (error) {
			throw error
		}
	},
	getBrand: async (id: string) => {
		try {
			const response = await instance.get(getBrandsUrlAdmin(`${id}/`))
			return response.data
		} catch (error) {
			throw error
		}
	},
	updateBrand: async (id: string, data: any) => {
		try {
			const response = await instance.patch(getBrandsUrlAdmin(`${id}/`), data)
			return response.data
		} catch (error) {
			throw error
		}
	},
	createBrand: async (data: any) => {
		try {
			const response = await instance.post(getBrandsUrlAdmin(''), data)
			return response.data
		} catch (error) {
			throw error
		}
	},
	deleteBrand: async (id: string) => {
		try {
			const response = await instance.delete(getBrandsUrlAdmin(`${id}/`))
			return response.data
		} catch (error) {
			throw error
		}
	},
}
