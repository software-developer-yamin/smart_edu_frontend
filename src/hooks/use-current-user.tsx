import { IUserWithoutPassword } from '@/services/auth/auth.types';
import { useGetSingleUserQuery } from '@/services/user/user.api';
import { getCookie } from 'cookies-next';

export const useCurrentUser = () => {
  let user: IUserWithoutPassword | null = null;
  // const id = sessionStorage.getItem('userId') || localStorage.getItem('userId');

  const id = getCookie('userId');

  if (typeof id === 'string') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = useGetSingleUserQuery({ id });
    if (data) {
      user = data;
    }
  }
  return user;
};
