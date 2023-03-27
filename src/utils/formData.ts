// function buildFormData(formData, data, parentKey?) {
// 	if (
// 		data &&
// 		typeof data === 'object' &&
// 		!Array.isArray(data) &&
// 		!(data instanceof Date) &&
// 		!(data instanceof File)
// 	) {
// 		Object.keys(data).forEach((key) => {
// 			buildFormData(
// 				formData,
// 				data[key],
// 				parentKey ? `${parentKey}[${key}]` : key
// 			)
// 		})
// 	} else if (Array.isArray(data)) {
// 		data.forEach((itemOfItem) => buildFormData(formData, itemOfItem, parentKey))
// 	} else {
// 		const value = data == null ? '' : data
// 		formData.append(parentKey, value)
// 	}
// }

// export function formData(data) {
// 	const formData = new FormData()
// 	buildFormData(formData, data)
// 	return formData
// }

// export function formDataToObj(formData) {
// 	const obj = {}
// 	for (let key of formData.keys()) {
// 		obj[key] = formData.get(key)
// 	}
// 	return obj
// }

function buildFormData(formData: FormData, data: any, parentKey?: string) {
	if (data && typeof data === 'object' && !(data instanceof Date)) {
		if (Array.isArray(data)) {
			for (let i = 0; i < data.length; i++) {
				buildFormData(formData, data[i], `${parentKey}[${i}]`)
			}
		} else if (data instanceof File) {
			formData.append(parentKey, data)
		} else {
			for (let key in data) {
				if (Object.prototype.hasOwnProperty.call(data, key)) {
					const value = data[key]
					if (parentKey) {
						buildFormData(formData, value, `${parentKey}[${key}]`)
					} else {
						buildFormData(formData, value, key)
					}
				}
			}
		}
	} else {
		const value = data == null ? '' : data
		formData.append(parentKey, value)
	}
}

export function formData(data: any): FormData {
	const formData = new FormData()
	buildFormData(formData, data)
	return formData
}

export function formDataToObj(formData: FormData): any {
	const obj = {}
	for (let [key, value] of formData.entries()) {
		obj[key] = value
	}
	return obj
}

export function dataWithCleanImage(data: any, imageField: string) {
	if (!data) return null

	if (typeof data[imageField] === 'string') {
		delete data[imageField]
		return data
	}
	if (data[imageField] instanceof File) {
		return data
	}
}

export function hashMapToObjectArray(hashMap) {
	let array = []
	hashMap.forEach((value, key) => {
		array.push(value)
	})
	return array
}

export function dateToYYMMDD(dateString) {
	const date = new Date(dateString)

	const year = date.getFullYear()
	const month = ('0' + (date.getMonth() + 1)).slice(-2)
	const day = ('0' + date.getDate()).slice(-2)

	const formattedDate = `${year}-${month}-${day}`
	return formattedDate
}
