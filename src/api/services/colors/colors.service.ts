import { instance } from '../../interceptor'
import { getColorsUrl } from '../../../config/api.config'

export const ColorsService = {
	getColors: async () => {
		const { data } = await instance.get(getColorsUrl(''))
		return data
	},
}
