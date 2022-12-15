import { instance } from '../../interceptor'
import { getSizeUrl } from '../../../config/api.config'

export const SizesService = {
	getSizes: async () => {
		const { data } = await instance.get(getSizeUrl(''))
		return data
	},
}
