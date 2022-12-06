import { useTypedSelector } from 'hooks/useTypedSelector';
import { useRouter } from 'next/router';
import React from 'react';
import { FC } from 'react';

import { TypeComponentAuthFields } from 'shared/types/auth.types';

const CheckRole: FC<TypeComponentAuthFields> = ({ children, Component: { isOnlyUser } }) => {
  const user = useTypedSelector((state) => state.userStore.user);

  const router = useRouter();

  const Children = () => <>{children}</>;

  if (!isOnlyUser) return <Children />;
  if (isOnlyUser && user) return <Children />;
  else {
    router.pathname !== '/login' && router.replace('/login');
    return null;
  }
};

export default CheckRole;
