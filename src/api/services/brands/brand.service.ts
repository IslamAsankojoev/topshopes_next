import { CRUDservice } from 'api/crud.service'
import { getBrandsUrl } from 'config/api.config'

export const BrandsService = CRUDservice(getBrandsUrl, 'brand')
