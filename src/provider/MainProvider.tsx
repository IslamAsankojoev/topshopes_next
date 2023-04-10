import { FC } from 'react'
import { Provider } from 'react-redux'
import AuthProvider from './AuthProvider/AuthProvider'
import ToastifyProvider from './ToastifyProvider'
import { SessionProvider } from 'next-auth/react'
import store, { persistor } from 'src/store/store'
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'

const MainProvider: FC<any> = ({ children, Component, pageProps }) => {
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
