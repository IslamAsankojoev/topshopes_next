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

export const getErrorMessage = (e: any) => {
	if (!e) return 'Unknown error'

	// Handle regular JavaScript errors
	if (e instanceof Error) return e.message

	// Handle errors returned by Django DRF
	if (e.response && e.response.data) {
		const errorData = e.response.data
		const errorMessageCheck = errorData[Object.keys(errorData)[0]]
		const errorMessage = Array.isArray(errorMessageCheck)
			? errorMessageCheck[0]
			: errorMessageCheck
		const errorMessageKey = Object.keys(errorData)[0]
		if (errorMessage?.length > 1) {
			return `${errorMessageKey} - ${
				Array.isArray(errorMessage) ? errorMessage[0] : errorMessage
			}`
		}
		return errorMessage || 'Unknown error'
	}

	return 'Unknown error'
}
