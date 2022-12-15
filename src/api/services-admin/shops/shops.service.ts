import { instance } from '../../interceptor'
import { getShopsUrlAdmin } from '../../../config/api.config'

export const ShopsService = {
	getShops: async () => {
		const { data } = await instance.get(getShopsUrlAdmin(''))
		return data
	},
}
