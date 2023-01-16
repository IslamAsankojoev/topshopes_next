// first language is default
const languages = ['ru', 'kg', 'tr', 'en', 'pl']

module.exports = {
	distDir: 'build',
	devIndicators: {
		buildActivity: false,
	},
	i18n: {
		locales: [...languages],
		defaultLocale: languages[0],
		localeDetection: false,
	},
	images: {
		domains: ['localhost', '192.168.0.125'],
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
