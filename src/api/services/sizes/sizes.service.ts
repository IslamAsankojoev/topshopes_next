import { CRUDservice } from './../../crud.service';
import { getSizeUrl } from '../../../config/api.config'

export const SizesService = CRUDservice(getSizeUrl, 'size')

