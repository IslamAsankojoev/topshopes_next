import { useActions } from 'hooks/useActions'
import { useRouter } from 'next/router'
import React from 'react'
import Cookie from 'js-cookie'
import { useTypedSelector } from 'hooks/useTypedSelector'
import dynamic from 'next/dynamic'
import { getLocalStorage } from 'utils/local-storage/localStorage'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: React.FC<any> = ({
	children,
	Component: { isOnlyUser },
}) => {
	const { pathname, asPath, push } = useRouter()
	const { profile, checkAuth, logout } = useActions()
	const { user } = useTypedSelector((state) => state.userStore)

	React.useEffect(() => {
		const refresh = Cookie.get('refresh')
		if (refresh && !isOnlyUser && pathname === '/login') push('/profile')
		if (refresh && !isOnlyUser && pathname === '/signup') push('/profile')
	}, [pathname, asPath]) // eslint-disable-line react-hooks/exhaustive-deps

	React.useEffect(() => {
		const refresh = Cookie.get('refresh')
		if (refresh && isOnlyUser) profile()
	}, [pathname, asPath]) // eslint-disable-line react-hooks/exhaustive-deps

	React.useEffect(() => {
		const refreshToken = Cookie.get('refresh')
		if (!refreshToken && isOnlyUser) logout()
	}, [pathname, asPath]) // eslint-disable-line react-hooks/exhaustive-deps

	return !isOnlyUser ? (
		<>{children}</>
	) : (
		<DynamicCheckRole Component={{ isOnlyUser }}>{children}</DynamicCheckRole>
	)
}

export default AuthProvider
