import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { IProductPreview } from 'shared/types/product.types'

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
				localStorage.setItem('wishlist', JSON.stringify(state.items))
				toast.success(`Added to wishlist ${action.payload.name}`)
			} else {
				state.items = state.items.filter(
					(item) => item.id !== action.payload.id
				)
				localStorage.setItem('wishlist', JSON.stringify(state.items))
				toast.error('Removed from wishlist')
			}
		},
		setWishList: (state, action: PayloadAction<IProductPreview[]>) => {
			state.items = action.payload
			localStorage.setItem('wishlist', JSON.stringify(state.items))
		},
	},
})

export const { actions } = wishlistSlice

export default wishlistSlice.reducer
