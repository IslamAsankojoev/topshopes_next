export const MultipleSelectDataFormat = (
	arr: { id: string | number; name: string }[]
) => {
	return arr?.length ? arr?.map((obj) => `${obj.id}separator${obj.name}`) : []
}

export const getIdArray = (arr) => {
	return arr?.map((str) => {
		return MultipleSelectTextSplit(str)[0]
	})
}

export const MultipleSelectTextSplit = (text: string) => {
	return text.split('separator')
}
