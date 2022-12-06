import { actions as wishActions } from './wishlist/wishlist.slice';
import * as userActions from './user/user.actions';
import { actions as userSliceActions } from './user/user.slice';

export const allActions = {
  ...wishActions,
  ...userActions,
  ...userSliceActions,
};
