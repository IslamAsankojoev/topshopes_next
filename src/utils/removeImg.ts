export const removeImg = (data: any, key: string) => {
    if (typeof data[key] === typeof File) return data

    const response = {}
	for (let i in data) {
		if (i !== key) {
			response[i] = data[i]
		}
	}

	return response
}