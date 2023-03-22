import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProductVariant } from 'src/shared/types/product.types'

// import { IProductVariant } from 'src/shared/types/product.types'

// write initial state by hashmap
type ProductVariantsById = Record<string, IProductVariant>

const initialState: ProductVariantsById = {} // initial state is empty hashmap

const LocalVariantSlice = createSlice({
	name: 'localVariants',
	initialState,
	reducers: {
		localVariantAdd: (state, action: PayloadAction<IProductVariant>) => {
			const { id } = action.payload
			state[id] = action.payload
		},
		localVariantRemove: (state, action: PayloadAction<string>) => {
			const id = action.payload
			delete state[id]
		},
		localeVariantsClear: (state) => {
			return {}
		},
	},
})

export const actions = LocalVariantSlice.actions

export default LocalVariantSlice.reducer
