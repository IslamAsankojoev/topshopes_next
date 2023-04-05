import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useAuthRedirect = () => {
	const { data: session, status } = useSession()

	const { query, push } = useRouter()

	let redirect = query.redirect ? String(query.redirect) : '/profile'
	if (redirect === '/') redirect = '/profile'

	useEffect(() => {
		if (status === 'loading') return null
		if (!!session?.user) push(redirect)
	}, [redirect, push, status])
	return null
}
