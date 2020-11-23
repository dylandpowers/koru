import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import auth from './auth';
import session from './session';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  auth,
  session
});

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  pReducer,
  compose(applyMiddleware(thunk))
);

export default store;
export const persistor = persistStore(store);