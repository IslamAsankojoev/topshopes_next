import { getOrdersUrl } from 'config/api.config';
import { CRUDservice } from 'api/crud.service';

export const OrdersService = CRUDservice(getOrdersUrl, 'order')
