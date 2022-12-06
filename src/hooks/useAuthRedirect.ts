import { useRouter } from 'next/router';
import React from 'react';
import { useTypedSelector } from './useTypedSelector';

export const useAuthRedirect = () => {
  const { user } = useTypedSelector((state) => state.userStore);

  const { query, push } = useRouter();

  const redirect = query.redirect ? String(query.redirect) : '/';

  React.useEffect(() => {
    if (user) push(redirect);
  }, [user, redirect, push]);

  return null;
};
