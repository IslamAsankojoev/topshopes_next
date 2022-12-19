
export const getErrorMessage = (e: any) => {
    const errorData = e?.response?.data

    if (errorData) {
       return errorData[Object.keys(errorData)[0]]
    }

    return e.message
}