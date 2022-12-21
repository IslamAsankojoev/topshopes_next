import { CRUDservice } from './../../crud.service';
import { getAddressesUrl } from 'config/api.config';


export const AddressesService = CRUDservice(getAddressesUrl, 'address')
