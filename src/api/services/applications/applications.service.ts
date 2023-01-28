import { instance, makeRequest } from 'api/interceptor'
import { getAllProductsUrl, getApplicationsUrl } from 'config/api.config'
import { toast } from 'react-toastify'
import { getErrorMessage } from 'utils/getErrorMessage'

export const ApplicationServices = {
	getApplications: async () => {
		try {
			const { data } = await makeRequest(true).get(getApplicationsUrl(''))
			return data
		} catch (error) {}
	},
	getApplication: async (id: string) => {
		try {
			const { data } = await makeRequest(true).get(getApplicationsUrl(id))
			return data
		} catch (error) {}
	},
	createApplication: async (data: any) => {
		try {
			const response = await makeRequest(true).post(
				getApplicationsUrl(''),
				data
			)
			return response
		} catch (error) {}
	},
}
