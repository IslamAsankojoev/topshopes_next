import { CRUDservice } from './../../crud.service';
import { getProductsUrl } from 'config/api.config'

export const ProductService = CRUDservice(getProductsUrl, 'products')
