import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IInitialState } from './wishlist.interface'
import { toast } from 'react-toastify'
import { IProductPreview } from 'shared/types/product.types'

const initialState: IInitialState = {
	items: [],
}

export const wishlistSlice = createSlice({
	name: 'wishlist',
	initialState,
	reducers: {
		toggleWish: (state, action: PayloadAction<IProductPreview>) => {
			const exist = state.items.find(
				(item) => item.slug === action.payload.slug
			)
			if (!exist) {
				state.items.push(action.payload)
				localStorage.setItem('wishlist', JSON.stringify(state.items))
				toast.success(`Added to wishlist ${action.payload.name}`)
			} else {
				state.items = state.items.filter(
					(item) => item.slug !== action.payload.slug
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
