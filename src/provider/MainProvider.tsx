import { useTypedSelector } from 'hooks/useTypedSelector'
import React from 'react'
import { Provider } from 'react-redux'
import store from 'store/store'

import AuthProvider from './AuthProvider/AuthProvider'
import ToastifyProvider from './ToastifyProvider'
import WishCartProvider from './WishProvider'

const MainProvider: React.FC<any> = ({ children, Component, pageProps }) => {
	return (
		<>
			<Provider store={store}>
				<ToastifyProvider />
				<WishCartProvider />
				<AuthProvider Component={Component}>{children}</AuthProvider>
			</Provider>
		</>
	)
}

export default MainProvider
