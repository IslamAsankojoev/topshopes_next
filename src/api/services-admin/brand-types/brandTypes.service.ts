import { CRUDservice } from './../../crud.service';
import { getBrandsTypesUrlAdmin } from 'src/config/api.config'

export const BrandTypesService = CRUDservice(getBrandsTypesUrlAdmin, 'brand types')
