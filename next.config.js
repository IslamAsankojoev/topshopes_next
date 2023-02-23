const { i18n } = require('./next-i18next.config')

module.exports = {
	distDir: 'build',
	devIndicators: {
		buildActivity: false,
	},
	i18n,
	images: {
		domains: ['localhost', '192.168.0.125', '193.160.119.247', 'topshopes.com'],
	},
	trailingSlash: true,
	env: {
		SERVER_URL: process.env.REACT_APP_SERVER_URL,
		SECRET_KEY: process.env.REACT_APP_SECRET_KEY,
	},
	publicRuntimeConfig: {
		theme: 'DEFAULT',
	},
}
