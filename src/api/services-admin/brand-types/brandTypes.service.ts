import { CRUDservice } from './../../crud.service';
import { getBrandsTypesUrlAdmin } from 'config/api.config'

export const BrandTypesService = CRUDservice(getBrandsTypesUrlAdmin, 'brand types')
