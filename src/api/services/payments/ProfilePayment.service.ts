import { CRUDservice } from 'src/api/crud.service'
import { instance } from 'src/api/interceptor'
import { getProfilePaymentUrl } from 'src/config/api.config'
import { withShopKey } from 'src/pages-sections/checkout/paymentHelper'
import { toast } from 'react-toastify'
import { IAddress } from 'src/shared/types/user.types'
import { ICartItem } from 'src/store/cart/cart.interface'
import { formData } from 'src/utils/formData'
import { getErrorMessage } from 'src/utils/getErrorMessage'

interface postWithSortData {
	payment_type: string
	confirm_photo: File
	phone_number: string
	bank_account: string
}

export const ProfilePaymentService = {
	...CRUDservice(getProfilePaymentUrl, 'payment'),

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
						`/shops/products/${item?.id}/buy/`,
						{
							product_variant: item.variants[0]?.id,
							quantity: item.qty,
							address: address.id,
							payment: key,
						}
					)
				}
			}
		} catch (e) {
			toast.error(`payment: ${getErrorMessage(e)}`)
            throw e
        }
	},
}
