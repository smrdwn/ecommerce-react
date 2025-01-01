import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Middleware Configuration
const middleWares = [thunk];

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

export const persistor = persistStore(store);