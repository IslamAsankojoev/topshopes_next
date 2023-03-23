import { toast } from 'react-toastify'
import { CRUDservice } from 'src/api/crud.service'
import { instance } from 'src/api/interceptor'
import { getAttributesUrlAdmin } from 'src/config/api.config'
import { getErrorMessage } from 'src/utils/getErrorMessage'

export const AttributesServiceAdmin = {
	...CRUDservice(getAttributesUrlAdmin, 'attributes'),
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
