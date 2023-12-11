import {configureStore} from '@reduxjs/toolkit';

import productReducer from './features/product';

export default configureStore({
  reducer: {
    products: productReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
