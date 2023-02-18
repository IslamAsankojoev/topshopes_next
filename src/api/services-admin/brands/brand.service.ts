import { CRUDservice } from './../../crud.service'
import { getBrandsUrlAdmin } from 'src/config/api.config'

export const BrandsService = CRUDservice(getBrandsUrlAdmin, 'brands')
