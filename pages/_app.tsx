import RTL from 'src/components/RTL'
import { AppProvider } from 'src/contexts/AppContext'
import SettingsProvider from 'src/contexts/SettingContext'
import { NextPage } from 'next'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Fragment, ReactElement, ReactNode, useEffect, useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import 'react-toastify/dist/ReactToastify.css'
import { TypeComponentAuthFields } from 'src/shared/types/auth.types'
import 'simplebar/dist/simplebar.min.css'
import MuiTheme from 'src/theme/MuiTheme'
import OpenGraphTags from 'src/utils/OpenGraphTags'
import { ReactQueryDevtools } from 'react-query/devtools'

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
			session: unknown
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
		},
	},
}
const App = ({
	Component,
	pageProps: { session, ...pagePropses },
}: TypeAppProps) => {
	const AnyComponent = Component as any
	const getLayout = AnyComponent.getLayout ?? ((page) => page)
	const [queryClient] = useState(() => new QueryClient(config))

	useEffect(() => {
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
			<QueryClientProvider client={queryClient}>
				<SettingsProvider Component={Component} pageProps={pagePropses}>
					<Hydrate state={pagePropses.dehydratedState}>
						<AppProvider>
							<MuiTheme>
								<RTL>{getLayout(<AnyComponent {...{ ...pagePropses }} />)}</RTL>
							</MuiTheme>
						</AppProvider>
					</Hydrate>
				</SettingsProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
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
