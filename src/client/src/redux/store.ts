import { configureStore, Store } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { rootReducer } from './reducers';

let reduxStore: Store;

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
  });

  reduxStore = store;

  return store;
};

const wrapper = createWrapper(makeStore);

export { reduxStore };
export default wrapper;
