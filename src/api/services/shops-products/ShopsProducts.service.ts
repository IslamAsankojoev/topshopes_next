import { toast } from 'react-toastify';
import { IProduct } from 'shared/types/product.types';
import { axiosClassic } from 'api/interceptor';
import { getShopsProductsUrl } from 'config/api.config';
import { getErrorMessage } from 'utils/getErrorMessage';

export const ShopsProductsService = {
    getList: async (params?: Record<string, string | number>) => {
        try {
            const {data} = await axiosClassic.get<IProduct[]>(
                getShopsProductsUrl(''), 
                { params: {...params}}
                )
            return data
        }catch (error) {
            toast.error(`error ${getErrorMessage(error)}`)
            throw error
        }
    }
}