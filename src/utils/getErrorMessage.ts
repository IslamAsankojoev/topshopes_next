export const getErrorMessage = (e: any) => {
    const errorData = e?.response?.data
    const errorMessage = errorData[Object.keys(errorData)[0]][0]
    const errorMessageKey = [Object.keys(errorData)[0]]
    
    if (errorData && errorMessage.length > 1) {
       return `${errorMessageKey} - ${errorMessage}`
    }
    
    return e.message
}
