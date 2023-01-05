import { getShopUrl } from './../../../config/api.config'
import { CRUDservice } from './../../crud.service'

export const ShopService = CRUDservice(getShopUrl, 'Shop')
