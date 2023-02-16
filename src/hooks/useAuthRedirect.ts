import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useTypedSelector } from './useTypedSelector'

export const useAuthRedirect = () => {
	const { user } = useTypedSelector((state) => state.userStore)

	const { query, push } = useRouter()

	let redirect = query.redirect ? String(query.redirect) : '/profile'
	if(redirect === '/') redirect = '/profile'

	useEffect(() => {
		if (user) push(redirect)
	}, [user, redirect, push])

	return null
}
