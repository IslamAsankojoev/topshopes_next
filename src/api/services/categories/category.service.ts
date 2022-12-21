import { CRUDservice } from 'api/crud.service'
import { getCategoriesUrl } from 'config/api.config'

export const CategoriesService = CRUDservice(getCategoriesUrl, 'category')
