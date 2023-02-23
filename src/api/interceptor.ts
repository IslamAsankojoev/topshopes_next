import axios from 'axios'
import { API_URL } from 'src/config/api.config'
import Cookie from 'js-cookie'


// import { removeToken } from './services/auth/auth.helpers'
import { AuthService } from './services/auth/auth.service'
import { getSession, signOut } from 'next-auth/react'

export const axiosClassic = axios.create({
	baseURL: `${API_URL}`,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const instance = axios.create({
	baseURL: `${API_URL}`,
	headers: {
		'Content-Type': 'application/json',
	},
})

instance.interceptors.request.use( async (config) => {
	const session = await getSession();
		// @ts-ignore
	if (config.headers && session.user.accessToken)
	// @ts-ignore
		config.headers.Authorization = `Bearer ${session.user.accessToken}`
	return config
})

instance.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config

		if (
			error.response &&
			error.response.status === 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await AuthService.refresh()
				return instance.request(originalRequest)
			} catch (e) {
				signOut()
			}
		}

		throw error
	}
)

export const makeRequest = (auth: boolean = false) => {
	if (auth) {
		return instance
	}
	return axiosClassic
}
