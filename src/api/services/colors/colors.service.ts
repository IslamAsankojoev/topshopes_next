import { getErrorMessage } from 'utils/getErrorMessage';
import { toast } from 'react-toastify';
import { IColors } from 'shared/types/product.types';
import { instance } from '../../interceptor'
import { getColorsUrl } from '../../../config/api.config'

export const ColorsService = {
	getColors: async () => {
		try {
			const { data } = await instance.get(getColorsUrl(''))
			return data
		}catch (error) {
			toast.error(`color: ${getErrorMessage(error)}`)
			throw error
		}
	},
	getColor: async (id: string) => {
		try {
			const { data } = await instance.get(getColorsUrl(`${id}/`))
			return data
		}catch (error) {
			toast.error(`color: ${getErrorMessage(error)}`)
			throw error
		}
	},
	updateColor: async (id: string, data: IColors) => {
		try {
			const { data: updated } = await instance.patch(getColorsUrl(`${id}/`), data)
			return updated	
		}catch (error) {
			toast.error(`color: ${getErrorMessage(error)}`)
			throw error
		}
	},
	createColor: async (data: IColors) => {
		try {
			const { data: created } = await instance.post(getColorsUrl(''), data)
			return created
		}catch (error) {
			toast.error(`color: ${getErrorMessage(error)}`)
			throw error
		}
	},
	deleteColor: async (id: string) => {
		try {
			const { data: deleted } = await instance.delete(getColorsUrl(`${id}/`))
			return deleted
		}catch (error) {
			toast.error(`color: ${getErrorMessage(error)}`)
			throw error
		}
	},
}
