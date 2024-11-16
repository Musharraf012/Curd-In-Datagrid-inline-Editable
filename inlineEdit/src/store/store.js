import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import rootSaga from '../sagas/rootSaga'; // Your root saga
import getItemSlice from '../slices/getItemSlice'; // Example slice
import updateItemSlice from '../slices/updateItemSlice'; // Example slice

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Combine all your reducers
const rootReducer = combineReducers({
    getItemSlice: getItemSlice,
    updateItemSlice:updateItemSlice
});

// Persist configuration
const persistConfig = {
  key: 'root', // Key for localStorage
  storage,
};

// Wrap the reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
      sagaMiddleware
    ),
});

// Run the saga middleware
sagaMiddleware.run(rootSaga);

// Create the persisted store
const persistor = persistStore(store);

export { store, persistor };
