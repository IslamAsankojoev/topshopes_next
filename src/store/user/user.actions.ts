import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from 'api/services/auth/auth.service';
import { ILogin, IRegister } from './user.interface';
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
      toast.error('register');
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
      toast.error('login');
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

export const update = createAsyncThunk(
  'auth/profile/update',
  async ({ data, id }: any, thunkApi) => {
    try {
      const response = await AuthService.update(data, id);
      toast.success('Update success');
      return response;
    } catch (error) {
      toast.error('update');
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);
