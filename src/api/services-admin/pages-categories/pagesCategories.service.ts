import { CRUDservice } from './../../crud.service'
import { getPageCategoryUrlAdmin } from '../../../config/api.config'

export const PageCategoryService = CRUDservice(
	getPageCategoryUrlAdmin,
	'page category'
)
