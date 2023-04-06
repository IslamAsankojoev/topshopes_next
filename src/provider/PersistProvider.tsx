import React, { useEffect, useState } from 'react'
import { persistStore } from 'redux-persist'
import { useActions } from 'src/hooks/useActions'
import store from 'src/store/store'
import { getLocalStorage } from 'src/utils/local-storage/localStorage'

const PesristProvider = ({ children }) => {
	// const { setWishList, setCart } = useActions()
	// const [localStore, setLocalStore] = useState(null)

	// useEffect(() => {
	// 	setLocalStore(getLocalStorage('persist:root'))
	// }, [])

	// useEffect(() => {
	// 	if (localStore) {
	// 		const cartStore = JSON.parse(localStore.cartStore)
	// 		const wishStore = JSON.parse(localStore.wishStore)
	// 		setCart(cartStore.cart)
	// 		setWishList(wishStore.items)
	// 	}
	// }, [localStore])

	return <>{children}</>
}

export default PesristProvider
