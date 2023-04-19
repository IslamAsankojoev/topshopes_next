import { FC, useEffect, useLayoutEffect, useState } from 'react'
import { Provider } from 'react-redux'
import AuthProvider from './AuthProvider/AuthProvider'
import ToastifyProvider from './ToastifyProvider'
import { SessionProvider } from 'next-auth/react'
import store, { persistor } from 'src/store/store'
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import useScrollToSavedPosition from 'src/hooks/useScrollToSavedPosition'
import { useRouter } from 'next/router'

const MainProvider: FC<any> = ({ children, Component, pageProps }) => {
	const router = useRouter()

	// set referer path to local storage
	useEffect(() => {
		return () => {
			localStorage.setItem('referer_path', JSON.stringify(router.asPath) || '')
		}
	}, [router.pathname, router.asPath, router.query])

	// Cancel browser default scroll to saved position
	useLayoutEffect(() => {
		history.scrollRestoration = 'manual'
	}, [])

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
