import { combineReducers } from 'redux';

import userReducer, { UserReducer } from './userSlice';

export const rootReducer = combineReducers({
  user: userReducer,
});

export interface RootReducer {
  user: UserReducer;
}
