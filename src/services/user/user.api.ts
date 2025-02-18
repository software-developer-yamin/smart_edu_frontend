/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import {
  ICreateUserRequest,
  IDeleteUserRequest,
  IGetSingleUserRequest,
  IGetUsersRequestParams,
  IUpdateUserRequest,
  IUser,
  IUserWithFee,
  IUserWithoutPassword
} from './user.types';
import api from '@/lib/api';
import { IQueryResult } from '@/lib/types';

const apiWithUserTags = api.enhanceEndpoints({ addTagTypes: ['User'] });

const userApi = apiWithUserTags.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<IUserWithoutPassword, ICreateUserRequest>({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body
      }),
      invalidatesTags: ['User']
    }),
    getUsers: builder.query<
      IQueryResult<IUserWithoutPassword>,
      IGetUsersRequestParams
    >({
      query: (params) => ({
        url: 'users',
        method: 'GET',
        params
      }),
      providesTags: (data) =>
        data && data.results
          ? [
              ...data.results.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'PARTIAL-USER-LIST' }
            ]
          : [{ type: 'User', id: 'PARTIAL-USER-LIST' }]
    }),
    getSingleUser: builder.query<IUserWithoutPassword, IGetSingleUserRequest>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: 'GET'
      }),
      providesTags: (result) =>
        result ? [{ type: 'User', id: result.id }] : ['User']
    }),
    getSingleUserWithFee: builder.query<IUserWithFee, IGetSingleUserRequest>({
      query: ({ id }) => ({
        url: `users/${id}/fee`,
        method: 'GET'
      }),
      providesTags: (result) =>
        result ? [{ type: 'User', id: result.user.id }] : ['User']
    }),
    updateUser: builder.mutation<IUserWithoutPassword, IUpdateUserRequest>({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id },
        { type: 'User', id: 'PARTIAL-USER-LIST' }
      ]
    }),
    deleteUser: builder.mutation<void, IDeleteUserRequest>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id },
        { type: 'User', id: 'PARTIAL-USER-LIST' }
      ]
    })
  })
});

// Selectors
// TODO: fix selectUsers > always returns undefined
export const selectUsers = userApi.endpoints.getUsers.select({});
export const selectUserById = (id: IUser['id']) =>
  userApi.endpoints.getSingleUser.select({ id });
export const selectUserFromList = (id: IUser['id']) =>
  createSelector(
    selectUsers,
    (response) => response.data?.results.find((user) => user.id === id)
  );

export const getLoggedInUser = (): IUserWithoutPassword | null => {
  let user: IUserWithoutPassword | null = null;
  const id = sessionStorage.getItem('userId') || localStorage.getItem('userId');

  if (id) {
    const { data } = useSelector(selectUserById(id));
    if (data) {
      user = data;
    }
  }

  return user;
};

export const getUserById = (
  id: IUser['id']
): IUserWithoutPassword | undefined => {
  const { data } = useSelector(selectUserById(id));
  return data;
};

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useGetSingleUserQuery,
  useGetSingleUserWithFeeQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi;
export default userApi;
