import { CRUDservice } from 'api/crud.service'
import { instance } from 'api/interceptor'
import { getProfilePaymentUrl } from 'config/api.config'
import { withShopKey } from 'pages-sections/checkout/paymentHelper'
import { IAddress } from 'shared/types/user.types'
import { ICartItem } from 'store/cart/cart.interface'
import { formData } from 'utils/formData'

interface postWithSortData {
	payment_type: string
	confirm_photo: File
	phone_number: string
	bank_account: string
}

export const ProfilePaymentService = {
	...CRUDservice(getProfilePaymentUrl, 'posts'),

	pay: async ({
		cart,
		address,
		data,
	}: {
		cart: ICartItem[]
		address: IAddress
		data: postWithSortData
	}) => {
		try {
			// получение обьекта где ключ это id-shop, а значение это массив вариантов
			const withSortShops = withShopKey(cart)
			const variants = {}

			for (let i in withSortShops) {
				// получение обьекта где ключ это id-payment, а значение это массив вариантов
				const response = await ProfilePaymentService.create(formData(data))
				variants[response.id] = withSortShops[i]
			}

			for (let key in variants) {
				// webhook buy
				for (let item of variants[key]) {
					await instance.post(
						`/products/variants/${item.variants[0]?.id}/buy/`,
						{
							quantity: item.qty,
							address: address.id,
							payment_id: key,
						}
					)
				}
			}
		} catch (e) {
            throw e
        }
	},
}
