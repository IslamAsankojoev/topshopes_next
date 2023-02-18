import { useActions } from 'src/hooks/useActions'
import { FC, useEffect } from 'react'

import { getLocalStorage } from 'src/utils/local-storage/localStorage'

const WishCartProvider: FC = ({ children }) => {
	const { setWishList, setCart } = useActions()

	useEffect(() => {
		setWishList(getLocalStorage('wishlist') || [])
		setCart(getLocalStorage('cart') || [])
	}, [setWishList, setCart])

	return <>{children}</>
}

export default WishCartProvider
