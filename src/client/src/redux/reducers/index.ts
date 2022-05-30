import { combineReducers } from 'redux';

import { AuthReducer, authReducer } from './authReducer';
import userReducer, { UserReducer } from './userSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export interface RootReducer {
  auth: AuthReducer;
  user: UserReducer;
}
