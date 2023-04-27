import { axiosAuth } from 'src/api/interceptor'
import { getPaymentsUrlAdmin } from 'src/config/api.config'
import { toast } from 'react-toastify'
import { getErrorMessage } from 'src/utils/getErrorMessage'

export const PaymentServices = {
	getPayment: async (id: string) => {
		try {
			const { data } = await axiosAuth(true).get(getPaymentsUrlAdmin(id))
			return data
		} catch (error) {
			toast.error(getErrorMessage(error))
		}
	},
	updatePayment: async (id: string, data: any) => {
		try {
			const response = await axiosAuth(true).patch(
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
			const { data } = await axiosAuth(true).get(getPaymentsUrlAdmin(''))
			return data
		} catch (error) {
			toast.error(getErrorMessage(error))
		}
	},
}
