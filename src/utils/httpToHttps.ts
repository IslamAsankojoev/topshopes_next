const httpToHttps = (url: string) => {
	if (url.startsWith('http://')) {
		return url.replace('http://', 'https://')
	}
	return url
}
export default httpToHttps
