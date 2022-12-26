import { combineReducers } from '@reduxjs/toolkit'

import wishlistReducer from './wishlist/wishlist.slice'
import userReducer from './user/user.slice'
import cartReducer from './cart/cart.slice'

export const rootReducer = combineReducers({
	wishStore: wishlistReducer,
	userStore: userReducer,
	cartStore: cartReducer,
})
