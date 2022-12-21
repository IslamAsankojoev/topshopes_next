import { getErrorMessage } from 'utils/getErrorMessage'
import { toast } from 'react-toastify'
import { axiosClassic, instance } from 'api/interceptor'
import Cookies from 'js-cookie'
import {
	IAuthResponse,
	ILogin,
	IRegister,
	ITokens,
} from 'store/user/user.interface'
import { removeToken, saveToken, saveToStorage } from './auth.helpers'

export const AuthService = {
	register: async ({ email, phone, password }: IRegister) => {
		try {
			const response = await axiosClassic.post('profile/', {
				email,
				phone,
				password,
			})
			return response.data
		} catch (error) {
			toast.error(`auth: ${getErrorMessage(error)}`)
			throw error
		}
	},

	login: async ({ email, password }: ILogin) => {
		try {
			const response = await axiosClassic.post<IAuthResponse>('auth/login/', {
				email,
				password,
			})

			if (response.data.access) {
				Cookies.set('refresh', response.data.refresh)
				saveToken(response.data)
			}
			return response.data
		} catch (error) {
			toast.error(`auth: ${getErrorMessage(error)}`)
			throw error
		}
	},

	logout: async () => {
		try {
			removeToken()
			localStorage.removeItem('user')
		} catch (error) {
			toast.error(`auth: ${getErrorMessage(error)}`)
			throw error
		}
	},

	refresh: async () => {
		try {
			const response = await axiosClassic.post<IAuthResponse>('auth/refresh/', {
				refresh: Cookies.get('refresh'),
			})
			if (response.data.access) {
				saveToken(response.data)
			}
			return response.data
		} catch (error) {
			toast.error(`auth: ${getErrorMessage(error)}`)
			throw error
		}
	},

	profile: async () => {
		try {
			const response = await instance.get<IAuthResponse>('profile/')
			if (response.data) {
				saveToStorage(response.data)
			}
			return response.data
		} catch (error) {
			toast.error(`auth: ${getErrorMessage(error)}`)
			throw error
		}
	},

	update: async (data: any) => {
		try {
			const response = await instance.patch<IAuthResponse>(`profile/`, data)
			if (response.data) {
				saveToStorage(response.data)
			}
			return response.data
		} catch (error) {
			toast.error(`auth: ${getErrorMessage(error)}`)
			throw error
		}
	},
}
