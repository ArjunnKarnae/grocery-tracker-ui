import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import { groceryItemsApi } from './apis/groceryItemsApi';
import { editItemReducer } from './slices/editItemSlice';

const store = configureStore({
    reducer: {
        [groceryItemsApi.reducerPath]: groceryItemsApi.reducer,
        "editGroceryItem": editItemReducer
    },
    middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(groceryItemsApi.middleware)
   }
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };

