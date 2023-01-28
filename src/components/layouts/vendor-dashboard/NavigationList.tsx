import duotone from 'components/icons/duotone'

export const navigations = [
	{ type: 'label', label: 'admin', role: 'admin' },
	{
		name: 'dashboard',
		icon: duotone.Dashboard,
		path: '/vendor/dashboard',
		role: 'admin',
	},

	{
		name: 'allProducts',
		icon: duotone.Products,
		children: [
			{ name: 'productList', path: '/admin/products' },
			// { name: 'Create Product', path: '/admin/products/create' },
			{ name: 'category', path: '/admin/categories' },
			{ name: 'attributes', path: '/admin/attributes' },
			{ name: 'brand', path: '/admin/brands' },
			{ name: 'brandType', path: '/admin/brands-types' },
			{ name: 'reviews', path: '/admin/product-reviews' },
			// { name: 'Color', path: '/admin/colors' },
			// { name: 'Size', path: '/admin/sizes' },
		],
		role: 'admin',
	},
	{
		name: 'pages',
		icon: duotone.Pager,
		children: [
			{ name: 'pageList', path: '/admin/pages-list' },
			{ name: 'pagesCategory', path: '/admin/pages-category' },
		],
		role: 'admin',
	},

	{
		name: 'orders',
		icon: duotone.Order,
		path: '/admin/orders',
		role: 'admin',
	},

	{
		name: 'siteSetting',
		icon: duotone.SiteSetting,
		path: '/admin/site-settings',
		role: 'admin',
	},

	{
		name: 'members',
		icon: duotone.Customers,
		path: '/admin/customers',
		role: 'admin',
	},

	{
		name: 'sellers',
		icon: duotone.Seller,
		path: '/admin/sellers',
		role: 'admin',
	},

	// {
	// 	name: 'Refunds',
	// 	icon: duotone.Refund,
	// 	children: [
	// 		{ name: 'Refund Request', path: '/admin/refund-request' },
	// 		{ name: 'Refund Settings', path: '/admin/refund-setting' },
	// 	],
	// },

	// {
	// 	name: 'Sellers',
	// 	icon: duotone.Seller,
	// 	children: [
	// 		{ name: 'Seller List', path: '/admin/sellers' },
	// 		{ name: 'Seller Package', path: '/admin/seller-package' },
	// 		{ name: 'Package Payments', path: '/admin/package-payment' },
	// 		{ name: 'Earning History', path: '/admin/earning-history' },
	// 		{ name: 'Payouts', path: '/admin/payouts' },
	// 		{ name: 'Payout Request', path: '/admin/payout-request' },
	// 	],
	// 	role: 'admin',
	// },
	{ type: 'label', label: 'store', role: 'vendor' },
	{
		name: 'products',
		icon: duotone.Products,
		children: [
			{ name: 'productList', path: '/vendor/products' },
			{ name: 'createProduct', path: '/vendor/products/create' },
		],
		role: 'vendor',
	},
	{
		name: 'orders',
		icon: duotone.Order,
		path: '/vendor/orders',
		role: 'vendor',
	},
	// {
	// 	name: 'Earnings',
	// 	icon: duotone.ProjectChart,
	// 	children: [
	// 		{ name: 'Earning History', path: '/vendor/earning-history' },
	// 		{ name: 'Payouts', path: '/vendor/payouts' },
	// 		{ name: 'Payout Request', path: '/vendor/payout-requests' },
	// 		{ name: 'Payout Settings', path: '/vendor/payout-settings' },
	// 	],
	// },

	// {
	// 	name: 'Refund Request',
	// 	icon: duotone.Refund,
	// 	path: '/vendor/refund-request',
	// },

	{
		name: 'reviews',
		icon: duotone.Review,
		path: '/vendor/reviews',
		role: 'vendor',
	},

	{
		name: 'shopSetting',
		icon: duotone.SiteSetting,
		path: '/vendor/shop-settings',
		role: 'vendor',
	},

	// {
	// 	name: 'Support Tickets',
	// 	icon: duotone.ElementHub,
	// 	path: '/vendor/support-tickets',
	// },

	{
		name: 'accountSetting',
		icon: duotone.AccountSetting,
		path: '/vendor/account-setting',
		role: 'vendor',
	},
]
