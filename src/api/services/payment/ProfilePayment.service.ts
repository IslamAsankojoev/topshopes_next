import { getProfilePaymentUrl } from "config/api.config";
import { CRUDservice } from 'api/crud.service';
import { ICartItem } from "store/cart/cart.interface";


export const ProfilePaymentService = {
    ...CRUDservice(getProfilePaymentUrl, 'posts'),
    
    postWithSort: async (cart: ICartItem[]) => {
        const shops = {}
        for (let i of cart) {
            shops[i.shop.id] = shops[i.shop.id] ?[...shops[i.shop.id], i] :[i]
        }

        return shops
    }
}
