import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'

const useScrollToSavedPosition = () => {
	if (typeof window === 'undefined') return null
	const [scrollPosition, setScrollPosition] = useState(0)
	const router = useRouter()

	useEffect(() => {
		localStorage.setItem('scrollPosition', JSON.stringify(scrollPosition))
	}, [scrollPosition])

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setScrollPosition(window.scrollY)
		})

		return () => {
			setScrollPosition(window.scrollY)
			window.removeEventListener('scroll', () => {
				setScrollPosition(window.scrollY)
			})
		}
	}, [router.asPath])
	useLayoutEffect(() => {
		const storedPosition = localStorage.getItem('scrollPosition')

		if (storedPosition) {
			window.scrollTo(0, parseInt(storedPosition))
			setScrollPosition(parseInt(storedPosition))
		}
	}, [router.asPath])
}

export default useScrollToSavedPosition
