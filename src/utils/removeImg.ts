export const removeImg = (data: any, key: string) => {
    if (typeof data[key] != 'string') return data

    const response = {}
	for (let i in data) {
		if (i !== key) {
			response[i] = data[i]
		}
	}

	return response
}