import { CRUDservice } from 'src/api/crud.service'
import { getSizeUrl } from 'src/config/api.config'

export const SizesService = CRUDservice(getSizeUrl, 'size')
