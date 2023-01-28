import { makeRequest } from 'api/interceptor'
import { getApplicationsUrlAdmin } from 'config/api.config'
import { toast } from 'react-toastify'
import { getErrorMessage } from 'utils/getErrorMessage'

export const ApplicationServices = {
	getApplications: async (params: any) => {
		try {
			const { data } = await makeRequest(true).get(
				getApplicationsUrlAdmin(''),
				{
					params,
				}
			)
			return data
		} catch (error) {
			toast.error(getErrorMessage(error))
		}
	},
	getApplication: async (id: string) => {
		try {
			const { data } = await makeRequest(true).get(getApplicationsUrlAdmin(id))
			return data
		} catch (error) {
			toast.error(getErrorMessage(error))
		}
	},
	updateApplication: async (id: string, data: any) => {
		try {
			const response = await makeRequest(true).patch(
				getApplicationsUrlAdmin(id),
				data
			)
			return response
		} catch (error) {
			toast.error(getErrorMessage(error))
		}
	},
}
