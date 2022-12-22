import { CRUDservice } from 'api/crud.service'
import { getShopsUrlAdmin } from 'config/api.config'

export const ShopsService = CRUDservice(getShopsUrlAdmin, 'shops')
