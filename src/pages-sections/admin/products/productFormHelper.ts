import { objToFormData } from '../../../utils/formData'

export const checkChangeThumbnail = (data) => {
	const response = {}
	for (let i in data) {
		if (i !== 'thumbnail') {
			response[i] = data[i]
		}
	}
	return response
}
