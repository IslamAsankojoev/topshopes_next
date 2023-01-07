import { getErrorMessage } from 'utils/getErrorMessage'
import { toast } from 'react-toastify'
import { axiosClassic, instance } from 'api/interceptor'

const makeRequest = (auth: boolean) => {
	if (auth) {
		return instance
	}
	return axiosClassic
}

export const CRUDservice = (
	url: (id?: string) => string,
	toastText?: string,
	auth: boolean = true
) => {
	return {
		getList: async () => {
			try {
				const response = await makeRequest(auth).get(url(''))
				return response.data
			} catch (error) {
				toast.error(`${toastText || 'error'}: ${getErrorMessage(error)}`)
				throw error
			}
		},
		get: async (id: string) => {
			try {
				const response = await makeRequest(auth).get(url(`${id}/`))
				return response.data
			} catch (error) {
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
				toast.error(`${toastText || 'error'}: ${getErrorMessage(error)}`)
				throw error
			}
		},
		create: async (data: FormData | any) => {
			try {
				const response = await makeRequest(auth).post(url(''), data)
				return response.data
			} catch (error) {
				toast.error(`${toastText || 'error'}: ${getErrorMessage(error)}`)
				throw error
			}
		},
		delete: async (id: string | null) => {
			try {
				const response = await makeRequest(auth).delete(url(id ? `${id}/` : ''))
				return response.data
			} catch (error) {
				toast.error(`${toastText || 'error'}: ${getErrorMessage(error)}`)
				throw error
			}
		},
	}
}
