import { useActions } from 'hooks/useActions';
import { useRouter } from 'next/router';
import React from 'react';
import Cookie from 'js-cookie';
import { useTypedSelector } from 'hooks/useTypedSelector';
import dynamic from 'next/dynamic';

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false });

const AuthProvider: React.FC<any> = ({ children, Component: { isOnlyUser } }) => {
  const { pathname, asPath, push } = useRouter();
  const { profile, checkAuth, logout } = useActions();
  const { user } = useTypedSelector((state) => state.userStore);

  React.useEffect(() => {
    const accessToken = Cookie.get('token');
    if (accessToken && isOnlyUser) profile();
  }, [pathname, asPath]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const refreshToken = localStorage.getItem('refresh');
    if (!refreshToken && isOnlyUser) logout();
  }, [pathname, asPath]); // eslint-disable-line react-hooks/exhaustive-deps

  return !isOnlyUser ? (
    <>{children}</>
  ) : (
    <DynamicCheckRole Component={{ isOnlyUser }}>{children}</DynamicCheckRole>
  );
};

export default AuthProvider;
