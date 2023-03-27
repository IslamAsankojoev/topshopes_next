import { makeRequest } from 'src/api/interceptor'
import { getReportsUrl } from 'src/config/api.config'
import { dateToYYMMDD } from 'src/utils/formData'

export const ReportsService = {
	getPaidList: async (from?: Date, to?: Date) => {
		try {
			const response = await makeRequest(true).get(getReportsUrl('paid/'), {
				params: {
					date_from: dateToYYMMDD(from),
					date_to: dateToYYMMDD(to),
				},
			})
			return response.data
		} catch (error) {
			throw error
		}
	},
	getCompletedList: async (from?: Date, to?: Date) => {
		try {
			const response = await makeRequest(true).get(
				getReportsUrl('completed/'),
				{
					params: {
						date_from: dateToYYMMDD(from),
						date_to: dateToYYMMDD(to),
					},
				}
			)
			return response.data
		} catch (error) {
			throw error
		}
	},
}
