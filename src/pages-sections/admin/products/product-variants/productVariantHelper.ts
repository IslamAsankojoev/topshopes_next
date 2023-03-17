import { ProductVariantAdminService } from 'src/api/services-admin/product-variants/product-variants.service'
import { ProductVariantService } from 'src/api/services/product-variants/product-variants.service'

export const getVariantInfo = (id: string | number | any, data: any[]) => {
	if (id?.id) {
		return id?.name
	}
	let result = null
	for (let i of data) {
		if (i?.id == id) {
			result = i?.name
			break
		}
	}
	return result
}

export const adminCheckFetch = (admin = false) => {
	if (admin) {
		return ProductVariantAdminService
	}
	return ProductVariantService
}

export const getImgUrl = (img: File | Blob | string | any) => {
	if (!img) return '#'
	if (typeof img != 'string') {
		return URL.createObjectURL(img)
	}
	return img
}

export const variantCheck = (data, create) => (create ? data?.variant : data)
export const variantList = (data, create) => (create ? data : data?.variants)
