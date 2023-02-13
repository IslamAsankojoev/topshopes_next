const { i18n } = require('./next-i18next.config')

module.exports = {
	distDir: 'build',
	devIndicators: {
		buildActivity: false,
	},
	i18n,
	images: {
		domains: ['localhost', '192.168.0.125', '193.160.119.247'],
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
