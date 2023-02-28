import { CRUDservice } from 'src/api/crud.service'
import { getBrandsUrl } from 'src/config/api.config'

export const BrandsService = CRUDservice(getBrandsUrl, 'brand', false)
