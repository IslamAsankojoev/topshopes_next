import { IProductVariantInitialState } from './productVariant.interface';
import { createSlice } from '@reduxjs/toolkit'


const initialState: IProductVariantInitialState = {
	variants: []
}

const productVariantsSlice = createSlice({
	name: 'productVariants',
	initialState,
	reducers: {
        setVariants: (state, {payload}) => {
            state.variants = payload
        }
    },
})

export const { actions } = productVariantsSlice

export default productVariantsSlice.reducer
