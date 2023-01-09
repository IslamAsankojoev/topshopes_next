import { CRUDservice } from './../../crud.service'
import { getProductsUrl, getAllProductsUrl } from 'config/api.config'

export const ProductsService = CRUDservice(getProductsUrl, 'products')

export const ShopsProductsService = CRUDservice(getAllProductsUrl, 'shops-products', false)
