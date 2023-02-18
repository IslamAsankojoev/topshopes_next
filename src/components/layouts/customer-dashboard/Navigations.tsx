import {
	CreditCard,
	FavoriteBorder,
	Logout,
	Person,
	Place,
	Store,
	Widgets,
} from '@mui/icons-material'
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined'
import { Card, Typography, styled } from '@mui/material'
import { FlexBox } from 'src/components/flex-box'
import CustomerService from 'src/components/icons/CustomerService'
import NavLink, { NavLinkProps } from 'src/components/nav-link/NavLink'
import { useActions } from 'src/hooks/useActions'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import lodash from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC, Fragment } from 'react'

// custom styled components
const MainContainer = styled(Card)(({ theme }) => ({
	paddingBottom: '1.5rem',
	paddingTop: '2.5rem',
	[theme.breakpoints.down('md')]: {
		boxShadow: 'none',
		overflowY: 'auto',
		height: 'calc(100vh - 64px)',
	},
}))

type StyledNavLinkProps = { isCurrentPath: boolean }

const StyledNavLink = styled<FC<StyledNavLinkProps & NavLinkProps>>(
	({ children, isCurrentPath, ...rest }) => (
		<NavLink {...rest}>{children}</NavLink>
	)
)<StyledNavLinkProps>(({ theme, isCurrentPath }) => ({
	display: 'flex',
	alignItems: 'center',
	borderLeft: '4px solid',
	paddingLeft: '1.5rem',
	paddingRight: '1.5rem',
	marginBottom: '1.25rem',
	justifyContent: 'space-between',
	borderColor: isCurrentPath ? theme.palette.primary.main : 'transparent',
	'& .nav-icon': {
		color: isCurrentPath ? theme.palette.primary.main : theme.palette.grey[600],
	},
	'&:hover': {
		borderColor: theme.palette.primary.main,
		'& .nav-icon': { color: theme.palette.primary.main },
	},
}))

const Navigations = () => {
	const { t } = useTranslation('common')
	const { pathname } = useRouter()
	const { logout } = useActions()

	const user = useTypedSelector((state) => state.userStore.user)
	const is_seller = user?.is_seller
	const is_client = lodash.isEmpty(user) ? false : true
	const is_only_client = !is_seller && is_client

	const logoutHandler = () => {
		logout()
	}

	return (
		<MainContainer sx={{ pt: 3 }}>
			{linkList?.map((itemNav) => (
				<Fragment key={itemNav.title}>
					{itemNav.list?.map((item) => {
						// @ts-ignore
						if (is_seller && itemNav.role === 'is_seller') {
							return (
								<StyledNavLink
									href={item.href}
									key={item.title}
									isCurrentPath={pathname.includes(item.href)}
								>
									<FlexBox alignItems="center" gap={1}>
										<item.icon
											color="inherit"
											fontSize="small"
											className="nav-icon"
										/>
										<span>{t(item.title)}</span>
									</FlexBox>
								</StyledNavLink>
							)
						}
						// @ts-ignore
						if (is_client && itemNav.role === 'is_client') {
							return (
								<StyledNavLink
									href={item.href}
									key={item.title}
									isCurrentPath={pathname.includes(item.href)}
								>
									<FlexBox alignItems="center" gap={1}>
										<item.icon
											color="inherit"
											fontSize="small"
											className="nav-icon"
										/>
										<span>{t(item.title)}</span>
									</FlexBox>
								</StyledNavLink>
							)
						}
						// @ts-ignore
						if (is_only_client && itemNav.role === 'is_only_client') {
							return (
								<StyledNavLink
									href={item.href}
									key={item.title}
									isCurrentPath={pathname.includes(item.href)}
								>
									<FlexBox alignItems="center" gap={1}>
										<item.icon
											color="inherit"
											fontSize="small"
											className="nav-icon"
										/>
										<span>{t(item.title)}</span>
									</FlexBox>
								</StyledNavLink>
							)
						}
					})}
				</Fragment>
			))}
			<span
				style={{
					cursor: 'pointer',
					display: 'flex',
					alignItems: 'center',
					paddingLeft: '2rem',
					paddingRight: '1.5rem',
					marginBottom: '1.25rem',
					justifyContent: 'space-between',
				}}
				onClick={logoutHandler}
			>
				<FlexBox alignItems="center" gap={1}>
					<Logout fontSize="small" className="nav-icon" color="inherit" />
					<span>{t('logout')}</span>
				</FlexBox>
			</span>
		</MainContainer>
	)
}

const linkList = [
	{
		title: 'accountSettings',
		list: [
			{ href: '/profile', title: 'profileInfo', icon: Person },
			{
				href: '/address',
				title: 'addresses',
				icon: Place,
			},
		],
		role: 'is_client',
	},
	{
		title: 'dashboard',
		list: [
			{
				href: '/orders',
				title: 'orders',
				icon: ShoppingBagOutlined,
			},
			{
				href: '/wish-list',
				title: 'wishlist',
				icon: FavoriteBorder,
			},
			// {
			//   href: '/support-tickets',
			//   title: 'Support Tickets',
			//   icon: CustomerService,
			//   count: 1,
			// },
		],
		role: 'is_client',
	},

	{
		title: 'shopPanel',
		list: [
			{ href: '/vendor/shop-settings', title: 'store', icon: Store },
			{
				href: '/vendor/products',
				title: 'products',
				icon: Widgets,
			},
		],
		role: 'is_seller',
	},
	{
		title: 'shop',
		list: [{ href: '/shop-request', title: 'store', icon: Store }],
		role: 'is_only_client',
	},
]
export default Navigations
