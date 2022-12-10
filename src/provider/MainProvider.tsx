import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import store from 'store/store'
import AuthProvider from './AuthProvider/AuthProvider'
import ToastifyProvider from './ToastifyProvider'
import WishCartProvider from './WishProvider'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { languages } from '../config/languages.config'

const queryClient = new QueryClient()

const MainProvider: React.FC<any> = ({ children, Component }) => {
	const { locale, asPath, replace } = useRouter()

	// language check
	React.useEffect(() => {
		const lng = Cookie.get('i18nextLng')

		if (lng !== locale) {
			replace(asPath, asPath, { locale: lng })
		}

		if (!lng) {
			Cookie.set('i18nextLng', locale || languages[0])
		}
	}, [])

	return (
		<>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ToastifyProvider />
					<WishCartProvider />
					<AuthProvider Component={Component}>{children}</AuthProvider>
				</QueryClientProvider>
			</Provider>
		</>
	)
}

export default MainProvider
