import { Badge } from '@mui/material'
import CategoryOutlined from 'src/components/icons/CategoryOutline'
import Home from 'src/components/icons/Home'
import ShoppingBagOutlined from 'src/components/icons/ShoppingBagOutlined'
import User2 from 'src/components/icons/User2'
import { useAppContext } from 'src/contexts/AppContext'
import useWindowSize from 'src/hooks/useWindowSize'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { dynamicLocalization } from 'src/utils/Translate/dynamicLocalization'

import { StyledNavLink, Wrapper, iconStyle } from './styles'

const MobileNavigationBar: FC = () => {
	const width = useWindowSize()
	const { state } = useAppContext()

	const { t } = useTranslation('common')

	return width <= 900 ? (
		<Wrapper>
			{list?.map((item) => (
				<StyledNavLink href={item.href} key={item.title}>
					{item.title === 'Cart' ? (
						<Badge badgeContent={state.cart?.length} color="primary">
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
	// {
	// 	title: 'categories',
	// 	icon: CategoryOutlined,
	// 	href: '/mobile-category-nav',
	// },
	{ title: 'cart', icon: ShoppingBagOutlined, href: '/cart' },
	{ title: 'profile', icon: User2, href: '/profile' },
]

export default MobileNavigationBar
