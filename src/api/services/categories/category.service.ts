import { CRUDservice } from 'src/api/crud.service'
import { getCategoriesUrl } from 'src/config/api.config'

export const CategoriesService = CRUDservice(getCategoriesUrl, 'category', false)
