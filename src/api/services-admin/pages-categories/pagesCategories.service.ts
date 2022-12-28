import { CRUDservice } from 'api/crud.service';
import { getPageCategoryUrlAdmin } from 'config/api.config';


export const PageCategoryService = CRUDservice(
	getPageCategoryUrlAdmin,
	'page category'
)
