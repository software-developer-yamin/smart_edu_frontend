import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import {
  getCookie,
  getCookies,
  setCookie,
  deleteCookie,
  hasCookie
} from 'cookies-next';

const mutex = new Mutex();

const resetAuth = (): void => {
  // localStorage.removeItem('accessToken');
  // localStorage.removeItem('refreshToken');
  // localStorage.removeItem('userId');
  // sessionStorage.removeItem('accessToken');
  // sessionStorage.removeItem('refreshToken');
  // sessionStorage.removeItem('userId');

  deleteCookie('accessToken');
  deleteCookie('refreshToken');
  deleteCookie('userId');
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers) => {
    // const token =
    //   sessionStorage.getItem('accessToken') ||
    //   localStorage.getItem('accessToken');
    const token = getCookie('accessToken');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const rememberMe = localStorage.getItem('rememberMe');
        // const refreshToken =
        //   sessionStorage.getItem('refreshToken') ||
        //   localStorage.getItem('refreshToken');

        const refreshToken = getCookie('refreshToken');

        if (refreshToken) {
          // try to get a new token
          const refreshResult = await baseQuery(
            {
              url: '/auth/refresh-tokens',
              method: 'POST',
              body: { refreshToken }
            },
            api,
            extraOptions
          );
          if (refreshResult.data) {
            const userWithTokens = refreshResult.data as any;
            // if (rememberMe === 'true') {
            //   localStorage.setItem(
            //     'accessToken',
            //     userWithTokens.tokens.access.token
            //   );
            //   localStorage.setItem(
            //     'refreshToken',
            //     userWithTokens.tokens.refresh.token
            //   );
            //   localStorage.setItem('userId', userWithTokens.user.id);
            // } else {
            //   sessionStorage.setItem(
            //     'accessToken',
            //     userWithTokens.tokens.access.token
            //   );
            //   sessionStorage.setItem(
            //     'refreshToken',
            //     userWithTokens.tokens.refresh.token
            //   );
            //   sessionStorage.setItem('userId', userWithTokens.user.id);
            // }
            setCookie('accessToken', userWithTokens.tokens.access.token);
            setCookie('refreshToken', userWithTokens.tokens.refresh.token);
            setCookie('userId', userWithTokens.user.id);
          } else {
            resetAuth();
          }
        }
      } finally {
        release();
      }
    }
    // retry the initial query
    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

const api = createApi({
  reducerPath: 'rootApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({})
});

export default api;
