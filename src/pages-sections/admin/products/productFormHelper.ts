import { IProduct } from 'shared/types/product.types';

export const checkChangeThumbnail = (data: IProduct) => {
	if (typeof data.thumbnail != 'string') {
		return data
	}
	const response = {}
	for (let i in data) {
		if (i !== 'thumbnail') {
			response[i] = data[i]
		}
	}
	return response
}
