import { combineReducers } from '@reduxjs/toolkit'

import wishlistReducer from './wishlist/wishlist.slice'
import userReducer from './user/user.slice'
import cartReducer from './cart/cart.slice'
import productVariantReducer from './product-variant/productVariant.slice'

export const rootReducer = combineReducers({
	wishStore: wishlistReducer,
	userStore: userReducer,
	cartStore: cartReducer,
	productVariantsStore: productVariantReducer
})
