import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProductVariant } from 'src/shared/types/product.types'
import { v4 } from 'uuid'

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
			state[id] = {
				...action.payload,
				ordering: action.payload.ordering || 1,
			}
		},
		localVariantRemove: (state, action: PayloadAction<string>) => {
			const id = action.payload
			delete state[id]
		},
		localeVariantsClear: (_) => {
			return {}
		},
	},
})

export const actions = LocalVariantSlice.actions

export default LocalVariantSlice.reducer
