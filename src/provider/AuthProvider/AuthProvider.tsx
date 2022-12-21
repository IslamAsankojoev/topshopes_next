import { useActions } from 'hooks/useActions'
import { useRouter } from 'next/router'
import React from 'react'
import Cookie from 'js-cookie'
import { useTypedSelector } from 'hooks/useTypedSelector'
import dynamic from 'next/dynamic'
import { getLocalStorage } from 'utils/local-storage/localStorage'
import { AuthService } from 'api/services/auth/auth.service'
import { removeToken } from 'api/services/auth/auth.helpers'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: React.FC<any> = ({
	children,
	Component: { isOnlyUser },
}) => {
	const { pathname, asPath, push } = useRouter()
	const { checkAuth, logout, profile } = useActions()

	React.useEffect(() => {
		;(async () => {
			try {
				if (pathname === '/login' || pathname === '/signup') {
					const res = await AuthService.refresh()
					if (res) push('/profile')
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
				const res = await AuthService.refresh()
				if (isOnlyUser) profile()
			} catch (e) {
				logout()
			}
		})()
	}, [pathname, asPath]) // eslint-disable-line react-hooks/exhaustive-deps

	// React.useEffect(() => {
	// 	const refreshToken = Cookie.get('refresh')
	// 	if (!refreshToken && isOnlyUser) logout()
	// }, [pathname, asPath]) // eslint-disable-line react-hooks/exhaustive-deps

	return !isOnlyUser ? (
		<>{children}</>
	) : (
		<DynamicCheckRole Component={{ isOnlyUser }}>{children}</DynamicCheckRole>
	)
}

export default AuthProvider
