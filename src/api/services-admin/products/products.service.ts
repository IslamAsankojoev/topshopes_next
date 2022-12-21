import { CRUDservice } from './../../crud.service';
import { getProductsUrlAdmin } from '../../../config/api.config'

export const AdminProductsService = CRUDservice(getProductsUrlAdmin, 'admin products')