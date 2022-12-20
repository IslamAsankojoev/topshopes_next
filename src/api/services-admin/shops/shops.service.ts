import { getErrorMessage } from 'utils/getErrorMessage';
import { toast } from 'react-toastify';
import { instance } from '../../interceptor'
import { getShopsUrlAdmin } from '../../../config/api.config'

export const ShopsService = {
	getShops: async () => {
		try{
			const { data } = await instance.get(getShopsUrlAdmin(''))
			return data
		}catch (error) {
			toast.error(`shops: ${getErrorMessage(error)}`)
			throw error
		}
	},
}
