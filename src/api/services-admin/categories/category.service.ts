import { CRUDservice } from './../../crud.service'
import { getCategoriesUrlAdmin } from 'config/api.config'

export const CategoriesService = CRUDservice(
	getCategoriesUrlAdmin,
	'categories admin'
)
