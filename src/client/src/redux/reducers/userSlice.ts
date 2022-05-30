import { createSlice } from '@reduxjs/toolkit';

import { RejectedPayload, UserDetails } from '../types';

export interface UserReducer {
  error: string;
  user: UserDetails;
}

const initialState: UserReducer = {
  error: null,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInResolved: (state, action: { payload: UserDetails }) => {
      state.user = action.payload;
      state.error = null;
    },
    signInRejected: (state, action: { payload: RejectedPayload }) => {
      state.error = action.payload.error;
    },
    signUpResolved: (state, action: { payload: UserDetails }) => {
      state.user = action.payload;
      state.error = null;
    },
    signUpRejected: (state, action: { payload: RejectedPayload }) => {
      state.error = action.payload.error;
    },
    signOutResolved: (state) => {
      state.user = null;
      state.error = null;
    },
    signOutRejected: (state, action: { payload: RejectedPayload }) => {
      state.error = action.payload.error;
    },
    forgotPasswordResolved: (state) => {
      state.error = 'Please check your email to reset your password.';
    },
    forgotPasswordRejected: (state, action: { payload: RejectedPayload }) => {
      state.error = action.payload.error;
    },
  },
});

export const {
  signInResolved,
  signInRejected,
  signUpResolved,
  signUpRejected,
  signOutResolved,
  signOutRejected,
  forgotPasswordResolved,
  forgotPasswordRejected,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
