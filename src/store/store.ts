import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import { groceryItemsApi } from './apis/groceryItemsApi';
import { editItemReducer } from './slices/editItemSlice';
import { loginApi } from './apis/loginApi';
import { authApi } from './apis/authApi';

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [groceryItemsApi.reducerPath]: groceryItemsApi.reducer,
        "editGroceryItem": editItemReducer
    },
    middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware)
                                 .concat(loginApi.middleware)
                                 .concat(groceryItemsApi.middleware);
   }
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };

