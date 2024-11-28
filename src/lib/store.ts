import type { Action, Middleware, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

import {
  combineSlices,
  configureStore,
  createListenerMiddleware,
  isRejectedWithValue
} from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { setupListeners } from '@reduxjs/toolkit/query';

import api from './api';
import { formatErrorMessage } from './utils';
import type { IErrorResponse } from './types';

// Create listener middleware for side effects
const listenerMiddleware = createListenerMiddleware();

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(api);
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    toast.error(
      formatErrorMessage(
        (action.payload as { data: IErrorResponse | IErrorResponse['message'] })
          .data
      )
    );
  }

  return next(action);
};

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        api.middleware,
        rtkQueryErrorLogger,
        listenerMiddleware.middleware
      );
    }
  });

  // Enable listener behavior for the store
  setupListeners(store.dispatch);

  return store;
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
