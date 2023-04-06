import { FC } from 'react'
import { Provider } from 'react-redux'
import AuthProvider from './AuthProvider/AuthProvider'
import ToastifyProvider from './ToastifyProvider'
import { SessionProvider } from 'next-auth/react'
import store from 'src/store/store'
import PesristProvider from './PersistProvider'

const MainProvider: FC<any> = ({ children, Component, pageProps }) => {
	return (
		<>
			<SessionProvider session={pageProps.session}>
				<ToastifyProvider />
				<Provider store={store}>
					<PesristProvider>
						<AuthProvider Component={Component}>{children}</AuthProvider>
					</PesristProvider>
				</Provider>
			</SessionProvider>
		</>
	)
}

export default MainProvider
