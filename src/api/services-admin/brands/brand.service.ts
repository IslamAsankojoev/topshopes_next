import { CRUDservice } from './../../crud.service'
import { getBrandsUrlAdmin } from 'config/api.config'

export const BrandsService = CRUDservice(getBrandsUrlAdmin, 'brands')
