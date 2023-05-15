import { IPaymentType } from 'src/shared/types/order.types'
import { ICartItem } from 'src/store/cart/cart.interface'
import balance from '/public/assets/images/payment-methods/balance.webp'
import elsom from '/public/assets/images/payment-methods/elsom.webp'
import mbank from '/public/assets/images/payment-methods/mbank.webp'
import oDengi from '/public/assets/images/payment-methods/odengi.webp'
import visa from '/public/assets/images/payment-methods/visa.png'
import bakai from '/public/assets/images/payment-methods/BakaiBank.webp'

export const withShopKey = (cart: ICartItem[]) => {
	const shops = {}
	for (let i of cart) {
		shops[i.shop.id] = shops[i.shop.id] ? [...shops[i.shop.id], i] : [i]
	}

	return shops
}

export const deliveryRegions: {
	id: string
	name: string
	price: number
}[] = [
	{
		id: 'bishkek',
		name: 'Бишкек',
		price: 200,
	},
	{
		id: 'chui',
		name: 'Чуйская область',
		price: 300,
	},
	{
		id: 'osh',
		name: 'Ошская область',
		price: 1000,
	},
	{
		id: 'batken',
		name: 'Баткенская область',
		price: 1000,
	},
	{
		id: 'jalalabad',
		name: 'Джалал-Абадская область',
		price: 1000,
	},
	{
		id: 'naryn',
		name: 'Нарынская область',
		price: 1000,
	},
	{
		id: 'talas',
		name: 'Таласская область',
		price: 1000,
	},
	{
		id: 'issyk',
		name: 'Иссык-Кульская область',
		price: 1000,
	},
]

export const payment_methods: {
	id: IPaymentType
	name: string
	icon: any
	bank_account: number
	images?: string[]
	instruction?: any
}[] = [
	{
		id: 'bakai',
		name: 'Бакай Банк',
		bank_account: 1240020000900284,
		icon: bakai,
		instruction:
			'1.Откройте приложение кошелька на своем устройстве.| 2.Выберите раздел Оплата счетов или Услуги.| 3.Найдите провайдера, у которого вы хотите оплатить счет, и выберите его.| 4.Введите номер лицевого счета, который вы хотите оплатить.| 5.Введите сумму оплаты.| 6.Подтвердите платеж. | 7.Дождитесь подтверждения об успешном выполнении платежа.| 8. После подтверждения платежа сделайте скриншот оплаты и добавьте в поле изображения на сайте, это нужно для того чтобы мы проверили вашу оплату.',
	},
	// {
	// 	id: 'elsom',
	// 	name: 'Элсом',
	// 	icon: elsom,
	// 	images: [
	// 		'https://stock.xistore.by/upload/resize/news/detail/3480/c24/screenshot3_312_676_75.png',
	// 		'https://madgeek.io/wp-content/uploads/2019/06/Apple-IPhone_1-628x1024.jpg',
	// 	],
	// },
	// {
	// 	id: 'visa',
	// 	name: 'Visa',
	// 	icon: visa,
	// },
	// {
	// 	id: 'balance',
	// 	name: 'Balance',
	// 	icon: balance,
	// },
	// {
	// 	id: 'mbank',
	// 	name: 'MBank',
	// 	icon: mbank,
	// },
	// {
	// 	id: 'o_dengi',
	// 	name: 'О! деньги',
	// 	icon: oDengi,
	// },
]

export const paymentTranslations = {
	cardPhoneNumber: {
		en: 'Card or phone number',
		kz: 'Карта немесе телефон нөмірі',
		kg: 'Карта же телефон номери',
		ru: 'Карта или номер телефона',
		tr: 'Kart veya telefon numarası',
	},
}
