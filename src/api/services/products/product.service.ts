import { getAllProductsUrl, getProductsUrl } from '../../../config/api.config'

import { CRUDservice } from './../../crud.service'

export const ProductsService = {
	...CRUDservice(getProductsUrl, 'products'),
}

export const ShopsProductsService = CRUDservice(
	getAllProductsUrl,
	'shops-products',
	false
)
