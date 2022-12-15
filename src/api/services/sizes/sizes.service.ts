import { instance } from '../../interceptor'
import { getSizeUrl } from '../../../config/api.config'

export const SizesService = {
	getSizes: async () => {
		const { data } = await instance.get(getSizeUrl(''))
		return data
	},
	getSize: async (id) => {
		const { data } = await instance.get(getSizeUrl(`${id}/`))
		return data
	},
	createSize: async (data) => {
		const response = await instance.post(getSizeUrl(``), data)
		return response.data
	},
	updateSize: async (id, data) => {
		const response = await instance.patch(getSizeUrl(`${id}/`), data)
		return response.data
	},
	deleteSize: async (id) => {
		const { data } = await instance.delete(getSizeUrl(`${id}/`))
		return data
	},
}
