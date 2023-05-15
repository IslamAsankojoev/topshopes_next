import { Badge } from '@mui/material'
import CategoryOutlined from 'src/components/icons/CategoryOutline'
import Home from 'src/components/icons/Home'
import ShoppingBagOutlined from 'src/components/icons/ShoppingBagOutlined'
import User2 from 'src/components/icons/User2'
import { useAppContext } from 'src/contexts/AppContext'
import useWindowSize from 'src/hooks/useWindowSize'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { localize } from 'src/utils/Translate/localize'

import { StyledNavLink, Wrapper, iconStyle } from './styles'
import { useTypedSelector } from 'src/hooks/useTypedSelector'

const MobileNavigationBar: FC = () => {
	const width = useWindowSize()
	const { cart, total_items } = useTypedSelector((state) => state.cartStore)

	const { t } = useTranslation('common')

	return width <= 900 ? (
		<Wrapper>
			{list?.map((item) => (
				<StyledNavLink href={item.href} key={item.title}>
					{item.title === 'cart' ? (
						<Badge badgeContent={total_items} color="primary">
							<item.icon fontSize="small" sx={iconStyle} />
						</Badge>
					) : (
						<item.icon sx={iconStyle} fontSize="small" />
					)}

					{t(item.title)}
				</StyledNavLink>
			))}
		</Wrapper>
	) : null
}

const list = [
	{ title: 'home', icon: Home, href: '/' },
	{
		title: 'categories',
		icon: CategoryOutlined,
		href: '/mobile-category-nav',
	},
	{
		title: 'shop',
		icon: ShoppingBagOutlined,
		href: '/shop',
	},
	{ title: 'cart', icon: ShoppingBagOutlined, href: '/cart' },
	{ title: 'profile', icon: User2, href: '/profile' },
]

export default MobileNavigationBar
