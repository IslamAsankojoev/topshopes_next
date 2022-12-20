import { getErrorMessage } from 'utils/getErrorMessage';
import { axiosClassic, instance } from 'api/interceptor';
import { getOrdersUrl } from 'config/api.config';
import { toast } from 'react-toastify';

export const OrdersService = {
  getOrders: async () => {
    try {
      const response = await instance.get(getOrdersUrl(''));
      return response.data;
    } catch (error) {
			toast.error(`order: ${getErrorMessage(error)}`)
      throw error;
    }
  },
  getOrder: async (id: string) => {
    try {
      const response = await axiosClassic.get(getOrdersUrl(`${id}/`));
      return response.data;
    } catch (error) {
			toast.error(`order: ${getErrorMessage(error)}`)
      throw error;
    }
  },
};
