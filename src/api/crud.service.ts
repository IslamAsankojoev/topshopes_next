import { makeRequest } from 'src/api/interceptor'
import { toast } from 'react-toastify'
import { getErrorMessage } from 'src/utils/getErrorMessage'

export const CRUDservice = (
	url: (id?: string) => string,
	toastText?: string,
	auth: boolean = true,
	turnOnNotification?: boolean
) => {
	return {
		getList: async (params?: Record<string, string | number>) => {
			try {
				const response = await makeRequest(auth).get(url(''), { params })
				return response.data
			} catch (error) {
				turnOnNotification &&
					toast.error(`${toastText || 'error'}: ${getErrorMessage(error)}`)
				throw error
			}
		},
		get: async (id: string, params?: Record<string, string | number>) => {
			try {
				const response = await makeRequest(auth).get(url(`${id}/`), { params })
				return response.data
			} catch (error) {
				turnOnNotification &&
					toast.error(`${toastText || 'error'}: ${getErrorMessage(error)}`)
				throw error
			}
		},
		update: async (id: string | null, data: FormData | any) => {
			try {
				const response = await makeRequest(auth).patch(
					url(id ? `${id}/` : ''),
					data
				)
				return response.data
			} catch (error) {
				turnOnNotification &&
					toast.error(`${toastText || 'error'}: ${getErrorMessage(error)}`)
				throw error
			}
		},
		create: async (data: FormData | any) => {
			try {
				const response = await makeRequest(auth).post(url(''), data)
				return response.data
			} catch (error) {
				turnOnNotification &&
					toast.error(`${toastText || 'error'}: ${getErrorMessage(error)}`)
				throw error
			}
		},
		delete: async (id: string | null) => {
			try {
				const response = await makeRequest(auth).delete(url(id ? `${id}/` : ''))
				return response.data
			} catch (error) {
				turnOnNotification &&
					toast.error(`${toastText || 'error'}: ${getErrorMessage(error)}`)
				throw error
			}
		},
	}
}
