import { makeRequest } from 'api/interceptor'
import { getApplicationsUrl } from 'config/api.config'

export const ApplicationServices = {
	getApplications: async () => {
		try {
			const { data } = await makeRequest(true).get(getApplicationsUrl(''))
			return data
		} catch (error) {
			throw new Error(error)
		}
	},
	getApplication: async (id: string) => {
		try {
			const { data } = await makeRequest(true).get(getApplicationsUrl(id))
			return data
		} catch (error) {
			throw new Error(error)
		}
	},
	createApplication: async (data: any) => {
		try {
			const response = await makeRequest(true).post(
				getApplicationsUrl(''),
				data
			)
			return response
		} catch (error) {
			throw new Error(error)
		}
	},
}
