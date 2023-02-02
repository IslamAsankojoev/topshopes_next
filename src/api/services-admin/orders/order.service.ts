import { CRUDservice } from 'api/crud.service'
import { getOrdersUrlAdmin } from 'config/api.config'

export const OrdersService = CRUDservice(getOrdersUrlAdmin, 'admin order')
