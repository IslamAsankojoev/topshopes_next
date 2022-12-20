import { ISize } from 'shared/types/size.types';
import { getErrorMessage } from 'utils/getErrorMessage';
import { toast } from 'react-toastify';
import { instance } from '../../interceptor'
import { getSizeUrl } from '../../../config/api.config'

export const SizesService = {
	getSizes: async () => {
		try {
			const { data } = await instance.get(getSizeUrl(''))
			return data
		}catch (error) {
			toast.error(`sizes: ${getErrorMessage(error)}`)
			throw error
		}
	},
	getSize: async (id: string) => {
		try {
			const { data } = await instance.get(getSizeUrl(`${id}/`))
			return data
		}catch (error) {
			toast.error(`sizes: ${getErrorMessage(error)}`)
			throw error
		}
	},
	createSize: async (data: ISize) => {
		try {
			const response = await instance.post(getSizeUrl(``), data)
			return response.data
		}catch (error) {
			toast.error(`sizes: ${getErrorMessage(error)}`)
			throw error
		}

	},
	updateSize: async (id: string, data: ISize) => {
		try {
			const response = await instance.patch(getSizeUrl(`${id}/`), data)
			return response.data
		}catch (error) {
			toast.error(`sizes: ${getErrorMessage(error)}`)
			throw error
		}

	},
	deleteSize: async (id: string) => {
		try {
			const { data } = await instance.delete(getSizeUrl(`${id}/`))
			return data
		}catch (error) {
			toast.error(`sizes: ${getErrorMessage(error)}`)
			throw error
		}
	},
}


// try {

// }catch (error) {
// 	throw error
// }