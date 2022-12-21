export const getErrorMessage = (e: any) => {
	const errorData = e?.response?.data
	const errorMessage = errorData[Object.keys(errorData)[0]][0]

	if (errorData && errorMessage.length > 1) {
		return errorMessage
	}

	return e.message
}
// export const errorCatch = (error: any): string =>
// 	error.response && error.response.data
// 		? typeof error.response.data.message === 'object'
// 			? error.response.data.message[0]
// 			: error.response.data.message
// 		: error.message
