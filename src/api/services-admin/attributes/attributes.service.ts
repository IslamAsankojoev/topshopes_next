import { CRUDservice } from 'api/crud.service';
import { getAttributesUrlAdmin } from 'config/api.config'

export const AttributesServiceAdmin = CRUDservice(getAttributesUrlAdmin, 'attributes')
