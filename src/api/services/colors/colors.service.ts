import { instance } from '../../interceptor'
import { getColorsUrl } from '../../../config/api.config'

export const ColorsService = {
	getColors: async () => {
		const { data } = await instance.get(getColorsUrl(''))
		return data
	},
	getColor: async (id: string) => {
		const { data } = await instance.get(getColorsUrl(`${id}/`))
		return data
	},
	updateColor: async (id: string, data: any) => {
		const { data: updated } = await instance.patch(getColorsUrl(`${id}/`), data)
		return updated
	},
	createColor: async (data: any) => {
		const { data: created } = await instance.post(getColorsUrl(''), data)
		return created
	},
	deleteColor: async (id: string) => {
		const { data: deleted } = await instance.delete(getColorsUrl(`${id}/`))
		return deleted
	},
}
