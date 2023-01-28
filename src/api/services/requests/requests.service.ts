import { instance } from 'api/interceptor'
import { toast } from 'react-toastify'
import { getErrorMessage } from 'utils/getErrorMessage'

export const RequestServices = {
	shop_request: async (data: any) => {
		try {
			const response = await instance.post(`profile/create_application/`, data)
			return response.data
		} catch (error) {
			toast.error(`shop create: ${getErrorMessage(error)}`)
			throw error
		}
	},
}
