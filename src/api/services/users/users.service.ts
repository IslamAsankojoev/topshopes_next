import { getErrorMessage } from 'utils/getErrorMessage'
import { toast } from 'react-toastify'
import { axiosClassic, instance } from 'api/interceptor'
import { getUsersUrlAdmin } from 'config/api.config'

export const UsersService = {
	async getUsers() {
		try {
			const response = await instance.get(getUsersUrlAdmin(''))
			return response.data
		} catch (error) {
			toast.error(`users: ${getErrorMessage(error)}`)
			throw error
		}
	},
	async getUser(id: string) {
		try {
			const response = await instance.get(getUsersUrlAdmin(`${id}/`))
			return response.data
		} catch (error) {
			toast.error('users: ', getErrorMessage(error))
			throw error
		}
	},
	async updateUser(id: string, data: any) {
		try {
			const response = await instance.patch(getUsersUrlAdmin(`${id}/`), data)
			return response.data
		} catch (error) {
			toast.error('users: ', getErrorMessage(error))
			throw error
		}
	},
	async deleteUser(id: string) {
		try {
			const response = await instance.delete(getUsersUrlAdmin(`${id}/`))
			return response.data
		} catch (error) {
			toast.error('users: ', getErrorMessage(error))
			throw error
		}
	},
	async createUser(data: any) {
		try {
			const response = await instance.post(getUsersUrlAdmin(''), data)
			return response.data
		} catch (error) {
			toast.error('users: ', getErrorMessage(error))
			throw error
		}
	},
}
