import { actions as wishActions } from './wishlist/wishlist.slice'
import * as userActions from './user/user.actions'
import { actions as userSliceActions } from './user/user.slice'
import { actions as cartActions } from './cart/cart.slice'
import { actions as productVariantActions } from './product-variant/productVariant.slice'

export const allActions = {
	...wishActions,
	...userActions,
	...userSliceActions,
	...cartActions,
	...productVariantActions
}
