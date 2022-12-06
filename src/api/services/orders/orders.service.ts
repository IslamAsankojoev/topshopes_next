import { axiosClassic, instance } from 'api/interceptor';
import { getOrdersUrl } from 'config/api.config';
import { IOrder } from 'shared/types/order.types';

export const OrdersService = {
  getOrders: async () => {
    try {
      const response = await instance.get(getOrdersUrl(''));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getOrder: async (id: string) => {
    try {
      const response = await axiosClassic.get(getOrdersUrl(`${id}/`));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
