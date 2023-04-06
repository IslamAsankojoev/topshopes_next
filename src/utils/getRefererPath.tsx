const getRefererPath = () => {
	const refererPath = localStorage.getItem('referer_path')
	return JSON.parse(refererPath)
}
export default getRefererPath
