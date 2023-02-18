import { CRUDservice } from 'src/api/crud.service';
import { getAttributesUrlAdmin } from 'src/config/api.config'

export const AttributesServiceAdmin = CRUDservice(getAttributesUrlAdmin, 'attributes')
