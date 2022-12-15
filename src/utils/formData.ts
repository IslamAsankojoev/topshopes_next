function buildFormData(formData, data, parentKey?) {
	if (
		data &&
		typeof data === 'object' &&
		!Array.isArray(data) &&
		!(data instanceof Date) &&
		!(data instanceof File)
	) {
		Object.keys(data).forEach((key) => {
			buildFormData(
				formData,
				data[key],
				parentKey ? `${parentKey}[${key}]` : key
			)
		})
	} else if (Array.isArray(data)) {
		data.forEach((itemOfItem) => buildFormData(formData, itemOfItem, parentKey))
	} else {
		const value = data == null ? '' : data
		formData.append(parentKey, value)
	}
}

export function objToFormData(data) {
	const formData = new FormData()
	buildFormData(formData, data)
	console.log(formData)
	return formData
}
