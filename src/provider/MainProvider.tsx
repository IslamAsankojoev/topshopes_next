import { FC, useEffect, useLayoutEffect, useState } from 'react'
import { Provider } from 'react-redux'
import AuthProvider from './AuthProvider/AuthProvider'
import ToastifyProvider from './ToastifyProvider'
import { SessionProvider } from 'next-auth/react'
import store, { persistor } from 'src/store/store'
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import useScrollToSavedPosition from 'src/hooks/useScrollToSavedPosition'

const MainProvider: FC<any> = ({ children, Component, pageProps }) => {
	useEffect(() => {
		window.addEventListener('beforeunload', () => {
			document.body.style.overflow = 'hidden'
		})

		window.addEventListener('load', () => {
			document.body.style.overflow = 'auto'
		})

		return () => {
			window.removeEventListener('beforeunload', () => {
				document.body.style.overflow = 'hidden'
			})

			window.removeEventListener('load', () => {
				document.body.style.overflow = 'auto'
			})
		}
	}, [])
	useScrollToSavedPosition()

	return (
		<>
			<SessionProvider session={pageProps.session}>
				<ToastifyProvider />
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<AuthProvider Component={Component}>{children}</AuthProvider>
					</PersistGate>
				</Provider>
			</SessionProvider>
		</>
	)
}

export default MainProvider
