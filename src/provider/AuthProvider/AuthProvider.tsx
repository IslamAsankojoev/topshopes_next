import { AuthService } from 'src/api/services/auth/auth.service'
import { useActions } from 'src/hooks/useActions'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: FC<any> = ({
	children,
	Component: { isOnlyAuth, isOnlyAdmin, isOnlySeller, isOnlyClient },
}) => {
	const { pathname, asPath } = useRouter()
	const { logout, profile } = useActions()
	const { data: session, status } = useSession()

	useEffect(() => {
		if (status === 'loading') return null
		;(async () => {
			try {
				// logout if user is not auth and try to access to auth page
				if (isOnlyAuth && !session.user) logout()
				if (isOnlySeller && !session.user) logout()
				if (isOnlyAdmin && !session.user) logout()
				if (isOnlyClient && !session.user) logout()

				// refresh token if user is auth and try to access to auth page
				if (
					(isOnlyAuth && !!session.user) ||
					(isOnlyAdmin && !!session.user) ||
					(isOnlySeller && !!session.user) ||
					(isOnlyClient && !!session.user)
				) {
					const res = await AuthService.refresh()
					// refresh token and get new user data
					if (!!session?.user && res) profile()
				}
			} catch (e) {
				logout()
			}
		})()

		return () =>
			localStorage.setItem('referer_path', JSON.stringify(asPath) || '')
	}, [pathname, asPath, status])

	return !isOnlyAdmin && !isOnlyAuth && !isOnlySeller && !isOnlyClient ? (
		<>{children}</>
	) : (
		<DynamicCheckRole
			Component={{ isOnlyAdmin, isOnlyAuth, isOnlySeller, isOnlyClient }}
		>
			{children}
		</DynamicCheckRole>
	)
}

export default AuthProvider
