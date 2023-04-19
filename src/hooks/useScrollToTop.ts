import { useRouter } from 'next/router'
import { useEffect } from 'react'

const useScrollToTop = () => {
	const router = useRouter()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [router.asPath])
}

export default useScrollToTop
