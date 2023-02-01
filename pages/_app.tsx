import RTL from 'components/RTL'
import { AppProvider } from 'contexts/AppContext'
import SettingsProvider from 'contexts/SettingContext'
import { GetStaticProps, NextPage } from 'next'
import { appWithTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import React from 'react'
import { Fragment, ReactElement, ReactNode, useEffect, useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import 'react-toastify/dist/ReactToastify.css'
import { TypeComponentAuthFields } from 'shared/types/auth.types'
import 'simplebar/dist/simplebar.min.css'
import MuiTheme from 'theme/MuiTheme'
import OpenGraphTags from 'utils/OpenGraphTags'

import '../global.scss'
import '../src/fake-db'

type MyAppProps = AppProps & {
	Component: NextPage & {
		getLayout?: (page: ReactElement) => ReactNode
	}
}

type TypeAppProps = MyAppProps &
	TypeComponentAuthFields & {
		pageProps: {
			dehydratedState: unknown
		}
	}

//Binding events.
Router.events.on('routeChangeStart', () => nProgress.start())
Router.events.on('routeChangeComplete', () => nProgress.done())
Router.events.on('routeChangeError', () => nProgress.done())
// small change
nProgress.configure({ showSpinner: false })

const config = {
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 0,
			cacheTime: 0,
			staleTime: 0,
		},
	},
}

const App = ({ Component, pageProps }: TypeAppProps) => {
	const AnyComponent = Component as any
	const getLayout = AnyComponent.getLayout ?? ((page) => page)
	const [queryClient] = React.useState(() => new QueryClient(config))

	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement!.removeChild(jssStyles)
		}
	}, [])

	return (
		<Fragment>
			<Head>
				<meta charSet="utf-8" />
				<title>Topshopes</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
				<OpenGraphTags />
			</Head>

			<SettingsProvider Component={Component} pageProps={pageProps}>
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<AppProvider>
							<MuiTheme>
								<RTL>{getLayout(<AnyComponent {...pageProps} />)}</RTL>
							</MuiTheme>
						</AppProvider>
					</Hydrate>
				</QueryClientProvider>
			</SettingsProvider>
		</Fragment>
	)
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
// 	// calls page's `getInitialProps` and fills `appProps.pageProps`
// 	const appProps = await App.getInitialProps(appContext)

// 	return { ...appProps }
// }

export default appWithTranslation(App)
