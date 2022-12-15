import { instance } from '../../interceptor'
import { getBrandUrlAdmin } from '../../../config/api.config'

export const BrandService = {
	getBrands: async () => {
		const { data } = await instance.get(getBrandUrlAdmin(''))
		return data
	},
}
