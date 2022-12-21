import { getErrorMessage } from 'utils/getErrorMessage'
import { axiosClassic, instance } from 'api/interceptor'
import { getOrdersUrl } from 'config/api.config'
import { toast } from 'react-toastify'

export const OrdersService = {
	getOrders: async () => {
		try {
			const response = await instance.get(getOrdersUrl(''))
			return response.data
		} catch (error) {
			toast.error(`order: ${getErrorMessage(error)}`)
			throw error
		}
	},
	getOrder: async (id: string) => {
		try {
			const response = await instance.get(getOrdersUrl(`${id}/`))
			return response.data
		} catch (error) {
			toast.error(`order: ${getErrorMessage(error)}`)
			throw error
		}
	},
	updateOrder: async (id: string, data: any) => {
		try {
			const response = await instance.patch(getOrdersUrl(`${id}/`), data)
			return response.data
		} catch (error) {
			toast.error(`order: ${getErrorMessage(error)}`)
			throw error
		}
	},
	deleteOrder: async (id: string) => {
		try {
			const response = await instance.delete(getOrdersUrl(`${id}/`))
			return response.data
		} catch (error) {
			toast.error(`order: ${getErrorMessage(error)}`)
			throw error
		}
	},
	createOrder: async (data: any) => {
		try {
			const response = await instance.post(getOrdersUrl(''), data)
			return response.data
		} catch (error) {
			toast.error(`order: ${getErrorMessage(error)}`)
			throw error
		}
	},
}
