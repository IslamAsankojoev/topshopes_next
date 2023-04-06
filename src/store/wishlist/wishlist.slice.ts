import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IProductPreview } from 'src/shared/types/product.types'

import { IInitialState } from './wishlist.interface'

const initialState: IInitialState = {
	items: [],
}

export const wishlistSlice = createSlice({
	name: 'wishlist',
	initialState,
	reducers: {
		toggleWish: (state, action: PayloadAction<IProductPreview>) => {
			const exist = state.items.find((item) => item.id === action.payload.id)
			if (!exist) {
				state.items.push(action.payload)
				toast.success(`${action.payload.name} добавлен в избранное`)
			} else {
				state.items = state.items.filter(
					(item) => item.id !== action.payload.id
				)
			}
		},
		setWishList: (state, action: PayloadAction<IProductPreview[]>) => {
			state.items = action.payload
		},
	},
})

export const { actions } = wishlistSlice

export default wishlistSlice.reducer
