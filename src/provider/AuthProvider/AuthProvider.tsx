import { removeToken } from 'api/services/auth/auth.helpers'
import { AuthService } from 'api/services/auth/auth.service'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import Cookie from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'
import { getLocalStorage } from 'utils/local-storage/localStorage'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: React.FC<any> = ({
	children,
	Component: { isOnlyUser, isOnlyAdmin },
}) => {
	const { pathname, asPath, push } = useRouter()
	const { checkAuth, logout, profile } = useActions()

	React.useEffect(() => {
		;(async () => {
			try {
				const refresh = Cookie.get('refresh')
				if (pathname === '/login' || pathname === '/signup') {
					if (refresh) {
						const res = await AuthService.refresh()
						if (res) push('/profile')
					}
				}
			} catch (e) {
				logout()
			}
		})()
	}, [pathname, asPath]) // eslint-disable-line react-hooks/exhaustive-deps

	React.useEffect(() => {
		;(async () => {
			try {
				const refresh = Cookie.get('refresh')

				if (!refresh && isOnlyUser) logout()
				if ((isOnlyUser && refresh) || (isOnlyAdmin && refresh)) {
					const res = await AuthService.refresh()
					if (res) profile()
				}
			} catch (e) {
				logout()
			}
		})()
	}, [pathname, asPath]) // eslint-disable-line react-hooks/exhaustive-deps

	// React.useEffect(() => {
	// 	const refreshToken = Cookie.get('refresh')
	// 	if (!refreshToken && isOnlyUser) logout()
	// }, [pathname, asPath]) // eslint-disable-line react-hooks/exhaustive-deps

	// return !isOnlyUser ? (
	// 	<>{children}</>
	// ) : (
	// 	<DynamicCheckRole Component={{ isOnlyUser }}>{children}</DynamicCheckRole>
	// )

	return !isOnlyAdmin && !isOnlyUser ? (
		<>{children}</>
	) : (
		<DynamicCheckRole Component={{ isOnlyAdmin, isOnlyUser }}>
			{children}
		</DynamicCheckRole>
	)
}

export default AuthProvider
