import { createSlice } from '@reduxjs/toolkit';
import { IInitialState } from './wishlist.interface';
import { toast } from 'react-toastify';

const initialState: IInitialState = {
  items: [],
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWish: (state, action) => {
      const exist = state.items.find((item) => item.id === action.payload.id);
      if (!exist) {
        state.items.push(action.payload);
        localStorage.setItem('wishlist', JSON.stringify(state.items));
        toast.success(`Added to wishlist ${action.payload.title}`);
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        localStorage.setItem('wishlist', JSON.stringify(state.items));
        toast.error('Removed from wishlist');
      }
    },
    setWishList: (state, action) => {
      state.items = action.payload;
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
  },
});

export const { actions } = wishlistSlice;

export default wishlistSlice.reducer;
