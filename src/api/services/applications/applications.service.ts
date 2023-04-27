import { axiosAuth } from 'src/api/interceptor'
import { getApplicationsUrl } from 'src/config/api.config'

export const ApplicationServices = {
	getApplications: async () => {
		try {
			const { data } = await axiosAuth(true).get(getApplicationsUrl(''))
			return data
		} catch (error) {
			throw new Error(error)
		}
	},
	getApplication: async (id: string) => {
		try {
			const { data } = await axiosAuth(true).get(getApplicationsUrl(id))
			return data
		} catch (error) {
			throw new Error(error)
		}
	},
	createApplication: async (data: any) => {
		try {
			const response = await axiosAuth(true).post(getApplicationsUrl(''), data)
			return response
		} catch (error) {
			throw new Error(error)
		}
	},
}
