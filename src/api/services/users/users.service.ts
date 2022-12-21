import { CRUDservice } from './../../crud.service';
import { getUsersUrl } from 'config/api.config';

export const UsersService = CRUDservice(getUsersUrl, 'users')
