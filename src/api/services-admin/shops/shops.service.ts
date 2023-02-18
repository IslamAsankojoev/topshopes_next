import { CRUDservice } from 'src/api/crud.service'
import { getShopsUrlAdmin } from 'src/config/api.config'

export const ShopsService = CRUDservice(getShopsUrlAdmin, 'shops')
