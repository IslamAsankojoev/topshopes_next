// export const getErrorMessage = (e: any) => {
// 	if (!e?.message && !e?.response?.data) return 'undefined'

// 	const errorData = e?.response?.data
// 	const errorMessageCheck = errorData[Object?.keys(errorData)[0]]
// 	const errorMessage = Array.isArray(errorMessageCheck)
// 		? errorMessageCheck[0]
// 		: errorMessageCheck
// 	const errorMessageKey = [Object?.keys(errorData)[0]]
// 	if (errorData && errorMessage?.length > 1) {
// 		return `${errorMessageKey} - ${
// 			Array.isArray(errorMessage) ? errorMessage[0] : errorMessage
// 		}`
// 	}
// }

// export const getErrorMessage = (e: any) => {
// 	if (!e) return 'Unknown error'

// 	// Handle regular JavaScript errors
// 	if (e instanceof Error) return e.message

// 	// Handle errors returned by Django DRF
// 	if (e.response && e.response.data) {
// 		const errorData = e.response.data
// 		const errorMessageCheck = errorData[Object.keys(errorData)[0]]
// 		const errorMessage = Array.isArray(errorMessageCheck)
// 			? errorMessageCheck[0]
// 			: errorMessageCheck
// 		const errorMessageKey = Object.keys(errorData)[0]
// 		if (errorMessage?.length > 1) {
// 			return `${errorMessageKey} - ${
// 				Array.isArray(errorMessage) ? errorMessage[0] : errorMessage
// 			}`
// 		}
// 		return errorMessage || 'Unknown error'
// 	}

// 	return 'Unknown error'
// }

export const getErrorMessage = (e: any) => {
	if (!e) return 'Unknown error'

	// Handle regular JavaScript errors
	if (e instanceof Error) return e.message

	// Handle errors returned by Django DRF
	if (e.response && e.response.data) {
		const errorData = e.response.data

		if (typeof errorData === 'object' && Object.keys(errorData).length > 0) {
			if (Object.keys(errorData).length === 1) {
				const errorKey = Object.keys(errorData)[0]
				const errorMessage = errorData[errorKey]
				if (Array.isArray(errorMessage)) {
					return `${errorKey} - ${errorMessage[0]}`
				} else {
					return `${errorKey} - ${errorMessage}`
				}
			} else {
				let errorMessage = ''
				Object.keys(errorData).forEach((key) => {
					errorMessage += `${key}: ${errorData[key][0]}\n`
				})
				return errorMessage.trim()
			}
		} else {
			return 'Unknown error'
		}
	}

	return 'Unknown error'
}
