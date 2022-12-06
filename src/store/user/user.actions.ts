import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClassic, instance } from 'api/interceptor';
import { AuthService } from 'api/services/auth/auth.service';
import { getUsersUrl } from 'config/api.config';
import { IAuthResponse, ILogin, IRegister, ITokens } from './user.interface';
import Cookie from 'js-cookie';
import { toast } from 'react-toastify';

// register
export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, phone }: IRegister, thunkApi) => {
    try {
      const response = await AuthService.register({ email, phone, password });
      toast.success('Register success');
      return response;
    } catch (error) {
      toast.error(error.response?.data[Object.keys(error.response?.data)[0]][0]);
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

// login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: ILogin, thunkApi) => {
    try {
      const response = await AuthService.login({ email, password });
      toast.success('Login success');
      return response;
    } catch (error) {
      toast.error(error.response?.data[Object.keys(error.response?.data)[0]]);
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

// logout
export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await AuthService.logout();
    toast.success('Logout success');
  } catch (error) {
    toast.error('logout');
    throw error;
  }
});

// refresh
export const checkAuth = createAsyncThunk('auth/refresh', async () => {
  try {
    const response = await AuthService.refresh({ refresh: Cookie.get('refresh') });
    toast.success('Logout success');
    return response;
  } catch (error) {
    toast.error('refresh');
    throw error;
  }
});

// profile
export const profile = createAsyncThunk('auth/profile', async () => {
  try {
    const response = await AuthService.profile();
    toast.success('Profile success');
    return response;
  } catch (error) {
    toast.error('profile');
    throw error;
  }
});
