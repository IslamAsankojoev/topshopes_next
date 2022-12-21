import { CRUDservice } from '../../crud.service'
import { getUsersUrlAdmin } from 'config/api.config'

export const UsersService = CRUDservice(getUsersUrlAdmin, 'users')
