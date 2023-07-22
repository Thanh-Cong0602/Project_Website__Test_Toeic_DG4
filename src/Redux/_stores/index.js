import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../_reducers'
import logger from "redux-logger";
import thunk from "redux-thunk";
const persistConfig = {
   key: 'root',
   storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
   reducer: persistedReducer,
   middleware: [thunk, logger],
});

const persistor = persistStore(store);


export { store, persistor };