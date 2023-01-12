import { useActions } from 'hooks/useActions'
import React from 'react'
import { getLocalStorage } from 'utils/local-storage/localStorage'

const WishCartProvider: React.FC = ({ children }) => {
	const { setWishList, setCart } = useActions()

	React.useEffect(() => {
		setWishList(getLocalStorage('wishlist') || [])
		setCart(getLocalStorage('cart') || [])
	}, [setWishList, setCart])

	return <>{children}</>
}

export default WishCartProvider
