import { CRUDservice } from './../../crud.service'
import { getAttrubutesUrl } from 'src/config/api.config'
import { instance } from 'src/api/interceptor'
import { toast } from 'react-toastify'
import { getErrorMessage } from 'src/utils/getErrorMessage'

export const AttributesService = {
	...CRUDservice(getAttrubutesUrl, 'attribute'),
	create: async (id: string, data: any) => {
		try {
			const response = await instance.post(
				`products/variants/${id}/create_attribute_value/`,
				data
			)
			return response.data
		} catch (error) {
			toast.error(`attribute: ${getErrorMessage(error)}`)
			throw error
		}
	},
}
