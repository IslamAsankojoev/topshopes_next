import { Direction } from '@mui/material'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import MainProvider from 'provider/MainProvider'
import { ReactNode, createContext, useEffect, useState } from 'react'

// ============================================================
export type SettingsOptions = { direction: Direction }
// ============================================================

// SET "rtl" OR "ltr" HERE
// THEN GOTO BROWSER CONSOLE AND RUN localStorage.clear() TO CLEAR LOCALSTORAGE
const initialSettings: SettingsOptions = { direction: 'ltr' }

export const SettingsContext = createContext({
	settings: initialSettings,
	updateSettings: (arg: SettingsOptions) => {},
})

// ============================================================
type settingsProviderProps = {
	children?: ReactNode
	Component: any
	pageProps: any
}
// ============================================================

const SettingsProvider = ({
	children,
	Component,
	pageProps,
}: settingsProviderProps) => {
	const [settings, setSettings] = useState(initialSettings)
	const { locale } = useRouter()

	const updateSettings = (updatedSetting: SettingsOptions) => {
		setSettings(updatedSetting)
		window.localStorage.setItem(
			'bazaar_settings',
			JSON.stringify(updatedSetting)
		)
	}

	useEffect(() => {
		if (!window) return null

		if (!Cookies.get('i18nextLng')) {
			Cookies.set('i18nextLng', locale)
		}

		const getItem = window.localStorage.getItem('bazaar_settings')

		if (getItem) setSettings(JSON.parse(getItem))
	}, [])

	return (
		<MainProvider Component={Component} pageProps={pageProps}>
			<SettingsContext.Provider value={{ settings, updateSettings }}>
				{children}
			</SettingsContext.Provider>
		</MainProvider>
	)
}

export default SettingsProvider
