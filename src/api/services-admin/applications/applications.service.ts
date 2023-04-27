import { axiosAuth } from 'src/api/interceptor'
import { getApplicationsUrlAdmin } from 'src/config/api.config'
import { toast } from 'react-toastify'
import { getErrorMessage } from 'src/utils/getErrorMessage'

export const ApplicationServices = {
	getApplications: async (params: any) => {
		try {
			const { data } = await axiosAuth(true).get(getApplicationsUrlAdmin(''), {
				params,
			})
			return data
		} catch (error) {
			toast.error(getErrorMessage(error))
		}
	},
	getApplication: async (id: string) => {
		try {
			const { data } = await axiosAuth(true).get(getApplicationsUrlAdmin(id))
			return data
		} catch (error) {
			toast.error(getErrorMessage(error))
		}
	},
	updateApplication: async (id: string, data: any) => {
		try {
			const response = await axiosAuth(true).patch(
				getApplicationsUrlAdmin(id),
				data
			)
			return response
		} catch (error) {
			toast.error(getErrorMessage(error))
		}
	},
}
