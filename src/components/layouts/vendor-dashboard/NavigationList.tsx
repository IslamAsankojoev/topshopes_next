import duotone from 'components/icons/duotone'

export const navigations = [
	{ type: 'label', label: 'Admin', role: 'admin' },
	{
		name: 'Dashboard',
		icon: duotone.Dashboard,
		path: '/vendor/dashboard',
		role: 'admin',
	},

	{
		name: 'All Products',
		icon: duotone.Products,
		children: [
			{ name: 'Product List', path: '/admin/products' },
			{ name: 'Create Product', path: '/admin/products/create' },
			{ name: 'Category', path: '/admin/categories' },
			{ name: 'Brand', path: '/admin/brands' },
			{ name: 'Brand Type', path: '/admin/brands-types' },
			{ name: 'Review', path: '/admin/product-reviews' },
			{ name: 'Color', path: '/admin/colors' },
			{ name: 'Size', path: '/admin/sizes' },
		],
		role: 'admin',
	},

	{
		name: 'Pages',
		icon: duotone.Pager,
		children: [
			{ name: 'Pages List', path: '/admin/pages-list' },
			{ name: 'Pages Category', path: '/admin/pages-category' },
		],
		role: 'admin',
	},

	{
		name: 'Customers',
		icon: duotone.Customers,
		path: '/admin/customers',
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

	{
		name: 'Sellers',
		icon: duotone.Seller,
		children: [
			{ name: 'Seller List', path: '/admin/sellers' },
			{ name: 'Seller Package', path: '/admin/seller-package' },
			{ name: 'Package Payments', path: '/admin/package-payment' },
			{ name: 'Earning History', path: '/admin/earning-history' },
			{ name: 'Payouts', path: '/admin/payouts' },
			{ name: 'Payout Request', path: '/admin/payout-request' },
		],
		role: 'admin',
	},
	{ type: 'label', label: 'Store', role: 'vendor' },
	{
		name: 'Products',
		icon: duotone.Products,
		children: [
			{ name: 'Product List', path: '/vendor/products' },
			{ name: 'Create Product', path: '/vendor/products/create' },
		],
		role: 'vendor',
	},
	{
		name: 'Orders',
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
		name: 'Reviews',
		icon: duotone.Review,
		path: '/vendor/reviews',
		role: 'vendor',
	},

	{
		name: 'Shop Setting',
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
		name: 'Account Setting',
		icon: duotone.AccountSetting,
		path: '/vendor/account-setting',
		role: 'vendor',
	},

	{
		name: 'Site Setting',
		icon: duotone.SiteSetting,
		path: '/vendor/site-settings',
		role: 'admin',
	},
	{
		name: 'Logout',
		icon: duotone.Session,
		path: '/vendor/dashboard-version-2',
		role: 'vendor',
	},
]
