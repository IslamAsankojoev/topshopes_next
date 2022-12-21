import { CRUDservice } from './../../crud.service';
import { getPageCategoryUrlAdmin } from '../../../config/api.config'

export const AdminPageCategoryService = CRUDservice(getPageCategoryUrlAdmin, 'page category')
