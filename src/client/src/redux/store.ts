import { createStore, applyMiddleware, Store, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProviderProps } from 'react-redux-firebase';

import { rootReducer } from './reducers';
import { firebase } from '../lib/firebase';

let reduxStore: Store;

let rrfProps: ReactReduxFirebaseProviderProps;

export const makeStore = () => {
  let composeEnhancers: typeof compose;
  const isServer = typeof window === 'undefined';

  if (!isServer) {
    const reduxDevtoolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    composeEnhancers = (reduxDevtoolsCompose && reduxDevtoolsCompose({ trace: true })) || compose;
  } else {
    composeEnhancers = compose;
  }

  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunkMiddleware.withExtraArgument({ getFirebase, getFirestore })),
      reduxFirestore(firebase)
    )
  );

  reduxStore = store;

  rrfProps = {
    firebase,
    config: {
      useFirestoreForProfile: true,
      userProfile: 'users',
      enableClaims: true,
    },
    dispatch: reduxStore.dispatch,
    createFirestoreInstance,
  };

  return store;
};

const wrapper = createWrapper(makeStore);

export { reduxStore, rrfProps };
export default wrapper;
