const { i18n } = require('./next-i18next.config')

module.exports = {
	devIndicators: {
		buildActivity: false,
	},
	i18n,
	trailingSlash: true,
	env: {
		SERVER_URL: process.env.REACT_APP_SERVER_URL,
	},
	publicRuntimeConfig: {
		// Available on both server and client
		theme: 'DEFAULT',
	},
}
