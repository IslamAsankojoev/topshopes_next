import { CRUDservice } from '../../crud.service'
import { getUsersUrlAdmin } from 'src/config/api.config'
import { axiosAuth } from 'src/api/interceptor'

export const UsersService = {
	...CRUDservice(getUsersUrlAdmin, 'users'),
	getSellers: async (params?: Record<string, string | number>) => {
		const { data } = await axiosAuth(true).get('admin/sellers/', {
			params,
		})
		return data
	},
	getCustomers: async (params?: Record<string, string | number>) => {
		const { data } = await axiosAuth(true).get('admin/customers/', {
			params,
		})
		return data
	},
}
