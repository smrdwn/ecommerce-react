import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Middleware Configuration
const middleWares = [sagaMiddleware];

// Add logger only in development
if (process.env.NODE_ENV === "development") {
  middleWares.push(logger);
}

// Enable Redux DevTools only in development
const composedEnhancers =
  process.env.NODE_ENV === "development" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(...middleWares))
    : compose(applyMiddleware(...middleWares));

// Create the Redux store
export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);