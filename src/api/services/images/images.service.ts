import { CRUDservice } from 'api/crud.service'
import { getImagesUrl } from 'config/api.config'

export const ImagesService = CRUDservice(getImagesUrl, 'images')
