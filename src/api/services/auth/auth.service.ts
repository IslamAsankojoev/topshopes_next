import { axiosClassic, instance } from 'src/api/interceptor'
import { toast } from 'react-toastify'
import { IAuthResponse, ILogin, IRegister } from 'src/store/user/user.interface'
import { getErrorMessage } from 'src/utils/getErrorMessage'

import { saveToStorage } from './auth.helpers'
import { getSession, signOut } from 'next-auth/react'
import { IUser } from 'src/shared/types/user.types'

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
			console.dir(error)
			toast.error(`auth: ${getErrorMessage(error)}`)
			throw error
		}
	},

	login: async ({ email, password }: ILogin) => {
		try {
			const response = await axiosClassic.post<IUser>('auth/login/', {
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
			const response = await signOut({
				callbackUrl: `/login?redirect=${window?.location?.pathname || '/'}`,
			})
			if (!!response) localStorage.removeItem('user')
		} catch (error) {
			toast.error(`auth: ${getErrorMessage(error)}`)
			throw error
		}
	},

	refresh: async () => {
		const session = await getSession()
		try {
			const response = await axiosClassic.post<IAuthResponse>('auth/refresh/', {
				// @ts-ignore
				refresh: session.refreshToken,
			})
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
