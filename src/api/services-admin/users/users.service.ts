import { CRUDservice } from '../../crud.service'
import { getUsersUrlAdmin } from 'src/config/api.config'

export const UsersService = CRUDservice(getUsersUrlAdmin, 'users')
