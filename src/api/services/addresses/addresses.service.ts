import { instance } from 'api/interceptor';
import { getAddressesUrl } from 'config/api.config';

export const AddressesService = {
  async getAddress(id: string) {
    try {
      const response = await instance.get(getAddressesUrl(`${id}`));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async addAddress(data: any) {
    try {
      const response = await instance.post(getAddressesUrl(''), data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async updateAddress(id: string, data: any) {
    try {
      const response = await instance.put(getAddressesUrl(`${id}`), data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async deleteAddress(id: string) {
    try {
      const response = await instance.delete(getAddressesUrl(`${id}`));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
