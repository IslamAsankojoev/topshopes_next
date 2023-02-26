import { axiosClassic, instance } from 'src/api/interceptor'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import {
	IAuthResponse,
	ILogin,
	IRegister,
} from 'src/store/user/user.interface'
import { getErrorMessage } from 'src/utils/getErrorMessage'

import { removeToken, saveToStorage, saveToken } from './auth.helpers'
import { getSession, signIn, signOut } from 'next-auth/react'

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
			return response.data
		} catch (error) {
			toast.error(`auth: ${getErrorMessage(error)}`)
			throw error
		}
	},

	logout: async () => {
		try {
			// removeToken() 
			signOut(
				{
					callbackUrl: '/login',
				}
			)
			localStorage.removeItem('user')
		} catch (error) {
			toast.error(`auth: ${getErrorMessage(error)}`)
			throw error
		}
	},

	refresh: async () => {
		const session = await getSession();
		try {
			const response = await axiosClassic.post<IAuthResponse>('auth/refresh/', {
				// @ts-ignore
				refresh: session.user.refreshToken
			})
			// if (response.data.access) {
			// 	saveToken(response.data)
			// }
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
