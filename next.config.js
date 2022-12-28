// first language is default
const languages = ['ru', 'kg', 'tr', 'en', 'pl']

module.exports = {
	devIndicators: {
		buildActivity: false,
	},
	i18n: {
		locales: [...languages],
		defaultLocale: languages[0],
		localeDetection: false,
	},
	images: {
		domains: ['localhost'],
	},
	trailingSlash: true,
	env: {
		SERVER_URL: process.env.REACT_APP_SERVER_URL,
	},
	publicRuntimeConfig: {
		// Available on both server and client
		theme: 'DEFAULT',
	},
}
