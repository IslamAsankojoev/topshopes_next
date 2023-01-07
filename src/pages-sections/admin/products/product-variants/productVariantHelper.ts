import { ProductVariantAdminService } from 'api/services-admin/product-variants/product-variants.service';
import { ProductVariantService } from 'api/services/product-variants/product-variants.service';

export const getVariantInfo = (id: string | number | any, data: any[]) => {
    if (id?.id) {
        return id?.name
    }
	let result = null
	for (let i of data) {
		if (i?.id == id) {
			result = i?.name
            break;
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