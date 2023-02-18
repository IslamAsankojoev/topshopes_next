import { CRUDservice } from 'src/api/crud.service'
import { getImagesUrl } from 'src/config/api.config'

export const ImagesService = CRUDservice(getImagesUrl, 'images')
