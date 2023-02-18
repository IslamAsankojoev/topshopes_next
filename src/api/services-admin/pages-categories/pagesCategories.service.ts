import { CRUDservice } from 'src/api/crud.service';
import { getPageCategoryUrlAdmin } from 'src/config/api.config';


export const PageCategoryService = CRUDservice(
	getPageCategoryUrlAdmin,
	'page category'
)
