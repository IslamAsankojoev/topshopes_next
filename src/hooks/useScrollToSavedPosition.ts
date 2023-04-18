import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'

const useScrollToSavedPosition = () => {
	if (typeof window === 'undefined') return null
	const [scrollPosition, setScrollPosition] = useState(0)

	const router = useRouter()

	useEffect(() => {
		console.log('useEffect')
		window.addEventListener('scroll', () => {
			setScrollPosition(window.scrollY)
		})

		localStorage?.setItem(
			'prevPageScrollPosition',
			JSON.parse(localStorage.getItem('scrollPosition'))?.[
				JSON.parse(localStorage.getItem('referer_path'))
			] || 0
		)

		return () => {
			window.removeEventListener('scroll', () => {
				setScrollPosition(window.scrollY)
			})
		}
	}, [router.asPath])

	useLayoutEffect(() => {
		const storedPosition = localStorage.getItem('prevPageScrollPosition')
		if (!!storedPosition) {
			window.scrollTo(0, parseInt(storedPosition))
			setScrollPosition(parseInt(storedPosition))
		}
	}, [router.asPath])

	useEffect(() => {
		localStorage.setItem(
			'scrollPosition',
			JSON.stringify({
				[router.asPath]: scrollPosition,
			})
		)
	}, [scrollPosition])

	// function handlePopstate(event) {
	// 	localStorage.setItem('prevPageScrollPosition', '0')
	// }

	// useEffect(() => {
	// 	window.addEventListener('popstate', handlePopstate)

	// 	// Удаляем обработчик события при размонтировании компонента
	// 	return () => {
	// 		window.removeEventListener('popstate', handlePopstate)
	// 	}
	// }, [router.asPath])
}

export default useScrollToSavedPosition
