import Cookie from 'js-cookie';
import { IUser } from 'shared/types/user.types';
import { ITokens } from 'store/user/user.interface';

export const saveToken = (data: ITokens) => {
  if (data.access) {
    Cookie.set('token', data.access);
  }
};

export const removeToken = () => {
  Cookie.remove('token');
  Cookie.remove('refresh');
};

export const saveUser = (user: IUser) => {
  Cookie.set('user', JSON.stringify(user));
};

export const saveToStorage = (data) => {
  localStorage.setItem('user', JSON.stringify(data));
};
