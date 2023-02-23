import { useTypedSelector } from 'src/hooks/useTypedSelector'
import lodash from 'lodash'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { TypeComponentAuthFields } from 'src/shared/types/auth.types'
import { useSession } from 'next-auth/react'

const CheckRole: FC<TypeComponentAuthFields> = ({
	children,
	Component: { isOnlyAuth, isOnlyAdmin, isOnlySeller, isOnlyClient },
}) => {
	const user = useTypedSelector((state) => state.userStore.user)
	const {data: session, status} = useSession()

	const router = useRouter()

	const Children = () => <>{children}</>

	// 1) check if user is client
	const is_client = !!session?.user

	if(status === 'loading') return null

	// 2) check if user is client and redirect to 404 page when user is not client
	if (!isOnlyAdmin && !isOnlyAuth && !isOnlySeller && !isOnlyClient)
		return <Children />

	// 3) check if user is only client and redirect to 404 page when user is not client
	if (
		(isOnlyClient && is_client && user?.is_seller) ||
		(isOnlyClient && is_client && user?.is_superuser)
	) {
		router.pathname !== '/profile' && router.push('/profile')
		return null
	}
	if (isOnlyClient && !is_client) 
	{
		router.pathname !== '/login' && router.replace('/login')
		return null
	}
	if (isOnlyClient && is_client) return <Children />

	if (isOnlyClient && !is_client) 
	{
		router.pathname !== '/login' &&
			router.replace(`/login/?redirect=${router.asPath}`)
		return null
	}

	// 4) check if user is client and redirect to login page when user is not client
	if (isOnlyAuth && is_client) return <Children />
	if (isOnlyAuth && !is_client) 
	{
		router.pathname !== '/login' &&
			router.replace(`/login/?redirect=${router.asPath}`)
		return null
	}

	// 5) check if user is seller and redirect to 404 page when user is not seller
	if (isOnlySeller && is_client && user?.is_seller) return <Children />
	if (isOnlySeller && is_client && !user?.is_seller) 
	{
		router.pathname !== '/' && router.push('/')
		return null
	}

	// 6) check if user is admin and redirect to 404 page when user is not admin
	if (isOnlyAdmin && is_client && user?.is_superuser) return <Children />
	if (isOnlyAdmin && is_client && !user?.is_superuser) 
	{
		router.pathname !== '/' && router.push('/')
		return null
	}
	
	return null
}

export default CheckRole
