import { useTypedSelector } from 'hooks/useTypedSelector'
import { useRouter } from 'next/router'
import React from 'react'
import { FC } from 'react'
import { TypeComponentAuthFields } from 'shared/types/auth.types'

const CheckRole: FC<TypeComponentAuthFields> = ({
	children,
	Component: { isOnlyUser, isOnlyAdmin },
}) => {
	const user = useTypedSelector((state) => state.userStore.user)

	const router = useRouter()

	// const Children = () => <>{children}</>

	// if (!isOnlyUser) return <Children />
	// if (isOnlyUser && user) return <Children />
	// else {
	// 	router.pathname !== '/login' && router.replace('/login')
	// 	return null
	// }

	const Children = () => <>{children}</>

	if (!isOnlyAdmin && !isOnlyUser) return <Children />

	if (user?.is_superuser) return <Children />

	if (isOnlyAdmin) {
		console.log('isOnlyAdmin')
		router.pathname !== '/404' && router.replace('/404')
		return null
	}

	const isUser = user && !user.is_superuser

	if (isUser && isOnlyUser) return <Children />
	else {
		router.pathname !== '/login' && router.replace('/login')
		return null
	}
}

export default CheckRole
