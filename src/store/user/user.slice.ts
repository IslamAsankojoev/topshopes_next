import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage } from 'utils/local-storage/localStorage';
import { login, logout, profile, register, update } from './user.actions';
import { IInitialState } from './user.interface';

const initialState: IInitialState = {
  user: getLocalStorage('user'),
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(register.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isLoading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(profile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(profile.fulfilled, (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(profile.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(update.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(update.fulfilled, (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(update.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { actions } = userSlice;

export default userSlice.reducer;
