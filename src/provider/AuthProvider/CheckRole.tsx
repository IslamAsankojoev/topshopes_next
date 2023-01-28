import { useTypedSelector } from 'hooks/useTypedSelector'
import lodash from 'lodash'
import { useRouter } from 'next/router'
import React from 'react'
import { FC } from 'react'
import { TypeComponentAuthFields } from 'shared/types/auth.types'

const CheckRole: FC<TypeComponentAuthFields> = ({
	children,
	Component: { isOnlyUser, isOnlyAdmin, isOnlySeller },
}) => {
	const user = useTypedSelector((state) => state.userStore.user)

	const router = useRouter()

	const Children = () => <>{children}</>

	// 1) check if user is client
	const is_client = lodash.isEmpty(user) ? false : true

	// 2) check if user is client and redirect to 404 page when user is not client
	if (!isOnlyAdmin && !isOnlyUser && !isOnlySeller) return <Children />

	// 3) check if user is client and redirect to login page when user is not client
	if (isOnlyUser && is_client) return <Children />
	if (isOnlyUser && !is_client) {
		router.pathname !== '/login' &&
			router.replace(`/login/?redirect=${router.asPath}`)
		return null
	}

	// 4) check if user is seller and redirect to 404 page when user is not seller
	if (isOnlySeller && user?.is_seller) return <Children />
	if (isOnlySeller && !user?.is_seller) {
		router.pathname !== '/' && router.replace('/')
		return null
	}

	// 5) check if user is admin and redirect to 404 page when user is not admin
	if (isOnlyAdmin && user?.is_superuser) return <Children />
	if (isOnlyAdmin && !user?.is_superuser) {
		router.pathname !== '/' && router.replace('/')
		return null
	}
}

export default CheckRole
