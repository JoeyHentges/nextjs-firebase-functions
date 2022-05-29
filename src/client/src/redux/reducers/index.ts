import { combineReducers } from 'redux';
import { firebaseReducer, FirebaseReducer } from 'react-redux-firebase';
import { firestoreReducer, FirestoreReducer } from 'redux-firestore';

import { AuthReducer, authReducer } from './authReducer';

export const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  auth: authReducer,
});

export interface RootReducer {
  firestore: FirestoreReducer.Reducer;
  firebase: FirebaseReducer.Reducer;
  auth: AuthReducer;
}
