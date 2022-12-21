import { CRUDservice } from './../../crud.service'
import { getPagesUrlAdmin } from '../../../config/api.config'

export const PagesService = CRUDservice(getPagesUrlAdmin, 'pages')
