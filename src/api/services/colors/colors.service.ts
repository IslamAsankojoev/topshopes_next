import { getColorsUrl } from '../../../config/api.config'
import { CRUDservice } from 'src/api/crud.service';

export const ColorsService = CRUDservice(getColorsUrl, 'color')
