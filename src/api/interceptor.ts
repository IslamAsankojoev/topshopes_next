import axios from 'axios'
import { API_URL } from 'config/api.config'
import Cookie from 'js-cookie'
import { removeToken } from './services/auth/auth.helpers'
import { AuthService } from './services/auth/auth.service'

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

instance.interceptors.request.use((config) => {
	const access = Cookie.get('token')
	if (config.headers && access)
		config.headers.Authorization = `Bearer ${access}`

	return config
})

instance.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config
		if (
			(error.response && error.response.status === 401) ||
			(error.config && !error.config._isRetry)
		) {
			originalRequest._isRetry = true
			try {
				await AuthService.refresh({ refresh: localStorage.getItem('refresh') })
				return instance.request(originalRequest)
			} catch (e) {
				removeToken()
			}
		}

		throw error
	}
)
