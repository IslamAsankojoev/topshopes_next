import { getShopsProductsUrl } from './../../../config/api.config';
import { CRUDservice } from 'api/crud.service';

export const ShopsProductsService = CRUDservice(getShopsProductsUrl, 'shops products')