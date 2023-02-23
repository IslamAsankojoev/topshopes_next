import { FC } from 'react'

import { Provider } from 'react-redux'
import store from 'src/store/store'

import AuthProvider from './AuthProvider/AuthProvider'
import ToastifyProvider from './ToastifyProvider'
import WishCartProvider from './WishProvider'
import { SessionProvider } from 'next-auth/react'


const MainProvider: FC<any> = ({ children, Component, pageProps }) => {
	return (
		<>
		<SessionProvider session={pageProps.session}>
			<Provider store={store}>
				<ToastifyProvider />
				<WishCartProvider />
				<AuthProvider Component={Component}>{children}</AuthProvider>
			</Provider>
		</SessionProvider>
		</>
	)
}

export default MainProvider
