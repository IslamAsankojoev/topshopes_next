import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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
			const exist = state.cart.find((x) => x.slug === payload.slug)
			if (exist) {
				state.cart = state.cart.map((x) =>
					x.slug === payload.slug ? { ...exist, qty: exist.qty + 1 } : x
				)
			} else {
				state.cart = [...state.cart, { ...payload, qty: 1 }]
			}
			state.total_price = state.cart.reduce(
				(acc, item) => acc + item.qty * parseInt(item.variants[0].price),
				0
			)
			state.total_items = state.cart?.length
			localStorage.setItem('cart', JSON.stringify(state.cart))
		},
		removeFromCart: (state, { payload }: PayloadAction<ICartItem>) => {
			const exist = state.cart.find((x) => x.slug === payload.slug)
			if (exist) {
				if (exist.qty > 1) {
					state.cart = state.cart.map((x) =>
						x.slug === payload.slug ? { ...exist, qty: exist.qty - 1 } : x
					)
				} else {
					state.cart = state.cart.filter((x) => x.slug !== payload.slug)
				}
			}
			state.total_price = state.cart.reduce(
				(acc, item) => acc + item.qty * parseInt(item.variants[0].price),
				0
			)
			state.total_items = state.cart?.length
			localStorage.setItem('cart', JSON.stringify(state.cart))
		},
		trashFromCart: (state, { payload }: PayloadAction<ICartItem>) => {
			state.cart = state.cart.filter((x) => x.slug !== payload.slug)
			state.total_price = state.cart.reduce(
				(acc, item) => acc + item.qty * parseInt(item.variants[0].price),
				0
			)
			state.total_items = state.cart?.length
			localStorage.setItem('cart', JSON.stringify(state.cart))
		},
	},
})

export const actions = cartSlice.actions

export default cartSlice.reducer
