import { axiosClassic, instance } from 'api/interceptor';
import { getUsersUrl } from 'config/api.config';
import { IAuthResponse, ILogin, IRegister, ITokens } from 'store/user/user.interface';
import { removeToken, saveToken, saveToStorage } from './auth.helpers';

export const AuthService = {
  register: async ({ email, phone, password }: IRegister) => {
    try {
      const response = await axiosClassic.post(getUsersUrl(''), {
        email,
        phone,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async ({ email, password }: ILogin) => {
    try {
      const response = await axiosClassic.post<IAuthResponse>('/token/create/', {
        email,
        password,
      });

      if (response.data.access) {
        localStorage.setItem('refresh', response.data.refresh);
        saveToken(response.data);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      removeToken();
      localStorage.removeItem('user');
      localStorage.removeItem('refresh');
    } catch (error) {
      throw error;
    }
  },

  refresh: async ({ refresh }: ITokens) => {
    try {
      const response = await axiosClassic.post<IAuthResponse>('/token/refresh/', { refresh });
      if (response.data.access) {
        saveToken(response.data);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  profile: async () => {
    try {
      const response = await instance.get<IAuthResponse>(getUsersUrl('me'));
      if (response.data) {
        saveToStorage(response.data);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
