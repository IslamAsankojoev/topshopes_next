import { useTypedSelector } from 'hooks/useTypedSelector'
import lodash from 'lodash'
import { useRouter } from 'next/router'
import React from 'react'
import { FC } from 'react'
import { TypeComponentAuthFields } from 'shared/types/auth.types'

const CheckRole: FC<TypeComponentAuthFields> = ({
	children,
	Component: { isOnlyAuth, isOnlyAdmin, isOnlySeller, isOnlyClient },
}) => {
	const user = useTypedSelector((state) => state.userStore.user)

	const router = useRouter()

	const Children = () => <>{children}</>

	// 1) check if user is client
	const is_client = lodash.isEmpty(user) ? false : true

	// 2) check if user is client and redirect to 404 page when user is not client
	if (!isOnlyAdmin && !isOnlyAuth && !isOnlySeller) return <Children />

	// 3) check if user is only client and redirect to 404 page when user is not client
	if ((isOnlyClient && user?.is_seller) || (isOnlyClient && user?.is_superuser))
		router.replace('/profile')

	// 4) check if user is client and redirect to login page when user is not client
	if (isOnlyAuth && is_client) return <Children />
	if (isOnlyAuth && !is_client) {
		router.pathname !== '/login' &&
			router.replace(`/login/?redirect=${router.asPath}`)
		return null
	}

	// 5) check if user is seller and redirect to 404 page when user is not seller
	if (isOnlySeller && user?.is_seller) return <Children />
	if (isOnlySeller && !user?.is_seller) {
		router.pathname !== '/' && router.replace('/')
		return null
	}

	// 6) check if user is admin and redirect to 404 page when user is not admin
	if (isOnlyAdmin && user?.is_superuser) return <Children />
	if (isOnlyAdmin && !user?.is_superuser) {
		router.pathname !== '/' && router.replace('/')
		return null
	}
}

export default CheckRole
