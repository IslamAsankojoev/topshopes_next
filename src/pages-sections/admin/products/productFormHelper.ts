import { objToFormData } from '../../../utils/formData'

export const checkChangeThumbnail = (data, thumbnail = null) => {
	if (thumbnail && typeof thumbnail != 'string') {
		return {
			...data,
			thumbnail: objToFormData(thumbnail),
		}
	}
	const response = {}
	for (let i in data) {
		if (i !== 'thumbnail') {
			response[i] = data[i]
			// response['thumbnail'] = objToFormData(data['thumbnail'])
		}
	}
	return response
}
