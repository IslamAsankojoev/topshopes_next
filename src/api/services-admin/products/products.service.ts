import { getProductsUrlAdmin } from '../../../config/api.config'

import { CRUDservice } from './../../crud.service'

export const AdminProductsService = CRUDservice(
	getProductsUrlAdmin,
	'admin products'
)
