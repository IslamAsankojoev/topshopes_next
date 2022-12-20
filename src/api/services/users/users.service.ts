import { getErrorMessage } from 'utils/getErrorMessage';
import { toast } from 'react-toastify';
import { axiosClassic } from 'api/interceptor';
import { getUsersUrl } from 'config/api.config';

export const UsersService = {
  async getUsers() {
    try {
      const response = await axiosClassic.get(getUsersUrl(''));
      return response.data;
    } catch (error) {
      toast.error(`users: ${getErrorMessage(error)}`)
      throw error;
    }
  },
  async getUser(id: string) {
    try {
      const response = await axiosClassic.get(getUsersUrl(`${id}/`));
      return response.data;
    } catch (error) {
      toast.error('users: ', getErrorMessage(error))
      throw error;
    }
  },
  async updateUser(id: string, data: any) {
    try {
      const response = await axiosClassic.put(getUsersUrl(`${id}/`), data);
      return response.data;
    } catch (error) {
      toast.error('users: ', getErrorMessage(error))
      throw error;
    }
  },
};
