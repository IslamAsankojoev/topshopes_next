import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { useRouter } from 'next/router'
import { FC, memo } from 'react'
import { TypeComponentAuthFields } from 'src/shared/types/auth.types'
import { useSession } from 'next-auth/react'
import MemizedChildren from 'src/components/MemizedChildren/MemizedChildren'

const CheckRole: FC<TypeComponentAuthFields> = ({
	children,
	Component: { isOnlyAuth, isOnlyAdmin, isOnlySeller, isOnlyClient },
}) => {
	const user = useTypedSelector((state) => state.userStore.user)
	const {data: session, status} = useSession()

	const router = useRouter()




	// 1) check if user is client
	const is_client = !!session?.user

	if(status === 'loading') return null

	// 2) check if user is client and redirect to 404 page when user is not client
	if (!isOnlyAdmin && !isOnlyAuth && !isOnlySeller && !isOnlyClient)
		return <MemizedChildren children={children}/>

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
	if (isOnlyClient && is_client) return <MemizedChildren children={children}/>

	if (isOnlyClient && !is_client)
	{
		router.pathname !== '/login' &&
			router.replace(`/login/?redirect=${router.asPath}`)
		return null
	}

	// 4) check if user is client and redirect to login page when user is not client
	if (isOnlyAuth && is_client) return <MemizedChildren children={children}/>
	if (isOnlyAuth && !is_client) 
	{
		router.pathname !== '/login' &&
			router.replace(`/login/?redirect=${router.asPath}`)
		return null
	}

	// 5) check if user is seller and redirect to 404 page when user is not seller
	if (isOnlySeller && is_client && user?.is_seller) return <MemizedChildren children={children}/>
	if (isOnlySeller && is_client && !user?.is_seller)
	{
		router.pathname !== '/404' && router.replace(`/404`)
		return null
	}

	// 6) check if user is admin and redirect to 404 page when user is not admin
	if (isOnlyAdmin && is_client && user?.is_superuser) return <MemizedChildren children={children}/>
	if (isOnlyAdmin && is_client && !user?.is_superuser)
	{
		router.pathname !== '/404' && router.replace(`/404`)
		return null
	}
	
	return null
}

export default CheckRole
