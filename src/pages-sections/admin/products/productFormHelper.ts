export const checkChangeThumbnail = (data, thumbnail) => {
	if (data.thumbnail !== thumbnail) {
		return data
	}
	const response = {}
	for (let i in data) {
		if (i !== 'thumbnail') {
			response[i] = data[i]
		}
	}
	return response
}
