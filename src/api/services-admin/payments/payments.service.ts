import { makeRequest } from 'api/interceptor'
import { getPaymentsUrlAdmin } from 'config/api.config'
import { toast } from 'react-toastify'
import { getErrorMessage } from 'utils/getErrorMessage'

export const PaymentServices = {
	getPayment: async (id: string) => {
		try {
			const { data } = await makeRequest(true).get(getPaymentsUrlAdmin(id))
			return data
		} catch (error) {
			toast.error(getErrorMessage(error))
		}
	},
	updatePayment: async (id: string, data: any) => {
		try {
			const response = await makeRequest(true).patch(
				getPaymentsUrlAdmin(id),
				data
			)
			return response
		} catch (error) {
			toast.error(getErrorMessage(error))
		}
	},
	getPayments: async () => {
		try {
			const { data } = await makeRequest(true).get(getPaymentsUrlAdmin(''))
			return data
		} catch (error) {
			toast.error(getErrorMessage(error))
		}
	},
}
