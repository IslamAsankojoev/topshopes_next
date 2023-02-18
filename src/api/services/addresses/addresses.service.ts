import { CRUDservice } from './../../crud.service'
import { getAddressesUrl } from 'src/config/api.config'

export const AddressesService = CRUDservice(getAddressesUrl, 'address')
