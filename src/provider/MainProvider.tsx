import React from 'react'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { Provider } from 'react-redux'
import store from 'store/store'
import AuthProvider from './AuthProvider/AuthProvider'
import ToastifyProvider from './ToastifyProvider'
import WishCartProvider from './WishProvider'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
			cacheTime: 0,
		},
	},
})

const MainProvider: React.FC<any> = ({ children, Component, pageProps }) => {
	return (
		<>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<ToastifyProvider />
						<WishCartProvider />
						<AuthProvider Component={Component}>{children}</AuthProvider>
					</Hydrate>
				</QueryClientProvider>
			</Provider>
		</>
	)
}

export default MainProvider
