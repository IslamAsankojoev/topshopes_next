import { CRUDservice } from 'src/api/crud.service'
import { getOrdersUrlAdmin } from 'src/config/api.config'

export const OrdersService = CRUDservice(getOrdersUrlAdmin, 'admin order')
