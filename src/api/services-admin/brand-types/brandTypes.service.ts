import { instance } from 'api/interceptor'
import { getBrandsTypesUrlAdmin } from 'config/api.config'

export const BrandTypesService = {
	getBrandsTypes: async () => {
		try {
			const response = await instance.get(getBrandsTypesUrlAdmin(''))
			return response.data
		} catch (error) {
			throw error
		}
	},
	getBrandTypes: async (id: string) => {
		try {
			const response = await instance.get(getBrandsTypesUrlAdmin(`${id}/`))
			return response.data
		} catch (error) {
			throw error
		}
	},
	updateBrandTypes: async (id: string, data: any) => {
		try {
			const response = await instance.patch(
				getBrandsTypesUrlAdmin(`${id}/`),
				data
			)
			return response.data
		} catch (error) {
			throw error
		}
	},
	createBrandTypes: async (data: any) => {
		try {
			const response = await instance.post(getBrandsTypesUrlAdmin(''), data)
			return response.data
		} catch (error) {
			throw error
		}
	},
	deleteBrandTypes: async (id: string) => {
		try {
			const response = await instance.delete(getBrandsTypesUrlAdmin(`${id}/`))
			return response.data
		} catch (error) {
			throw error
		}
	},
}
