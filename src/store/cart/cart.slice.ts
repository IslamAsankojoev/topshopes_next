import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { getLocalStorage } from 'src/utils/local-storage/localStorage'

import { ICartInitial, ICartItem } from './cart.interface'

const initialState: ICartInitial = {
	cart: [],
	total_price: 0,
	total_items: 0,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, { payload }: PayloadAction<ICartItem>) => {
			const exist = state.cart.find(
				(x) =>
					x.id === payload.id && x.variants[0].id === payload.variants[0].id
			)
			if (exist) {
				state.cart = [
					...state.cart.map((x) =>
						x.id === payload.id && x.variants[0].id === payload.variants[0].id
							? { ...exist, qty: exist.qty + 1 }
							: x
					),
				]
				toast.success(`${payload.name} добавлен в корзину`)
			} else {
				state.cart = [...state.cart, { ...payload, qty: 1 }]
			}
			state.total_price = state.cart.reduce(
				(acc, item) => acc + item.qty * parseInt(item.variants[0].price),
				0
			)
			state.total_items = state.cart?.length
		},
		removeFromCart: (state, { payload }: PayloadAction<ICartItem>) => {
			const exist = state.cart.find(
				(x) =>
					x.id === payload.id && x.variants[0].id === payload.variants[0].id
			)
			if (exist) {
				if (exist.qty > 1) {
					state.cart = state.cart.map((x) =>
						x.id === payload.id && x.variants[0].id === payload.variants[0].id
							? { ...exist, qty: exist.qty - 1 }
							: x
					)
				} else {
					state.cart = state.cart.filter(
						(x) =>
							x.id === payload.id && x.variants[0].id === payload.variants[0].id
					)
				}
			}
			state.total_price = state.cart.reduce(
				(acc, item) => acc + item.qty * parseInt(item.variants[0].price),
				0
			)
			state.total_items = state.cart?.length
		},
		trashFromCart: (state, { payload }: PayloadAction<ICartItem>) => {
			state.cart = [
				...state.cart.filter((x) => {
					if (x.id !== payload.id) {
						return x
					} else if (
						x.id === payload.id &&
						x.variants[0]?.id !== payload.variants[0]?.id
					) {
						return x
					}
				}),
			]
			state.total_price = state.cart.reduce(
				(acc, item) => acc + item.qty * parseInt(item.variants[0]?.price),
				0
			)
			state.total_items = state.cart?.length
		},
		setCart: (state, { payload }: PayloadAction<ICartItem[]>) => {
			state.cart = [...payload]
			state.total_price = state.cart?.reduce(
				(acc, item) => acc + item.qty * Number(item?.variants?.[0]?.price),
				0
			)
			state.total_items = state.cart?.length
		},
		clearCart: (state) => {
			state.cart = []
			state.total_price = 0
			state.total_items = 0
		},
	},
})

export const actions = cartSlice.actions

export default cartSlice.reducer
