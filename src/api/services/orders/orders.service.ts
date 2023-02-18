import { getOrdersUrl } from 'src/config/api.config';
import { CRUDservice } from 'src/api/crud.service';

export const OrdersService = CRUDservice(getOrdersUrl, 'order')