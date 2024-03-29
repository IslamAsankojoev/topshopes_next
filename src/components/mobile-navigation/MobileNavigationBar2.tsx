/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Box } from '@mui/material'
import CategoryOutlined from 'src/components/icons/CategoryOutline'
import Home from 'src/components/icons/Home'
import ShoppingBagOutlined from 'src/components/icons/ShoppingBagOutlined'
import User2 from 'src/components/icons/User2'
import { useAppContext } from 'src/contexts/AppContext'
import useWindowSize from 'src/hooks/useWindowSize'
import { useTranslation } from 'next-i18next'
import { FC, ReactNode, useEffect, useState } from 'react'
import { layoutConstant } from 'src/utils/constants'

import {
	StyledBox,
	StyledDrawer,
	StyledNavLink,
	Wrapper,
	iconStyle,
} from './styles'

// ===================================================
type Props = { children?: ReactNode }
// ===================================================

/**
 * Difference between MobileNaviagationBar and MobileNaviagationBar2
 * 1. In the MobileNaviagationBar we doesn't use conditinally render
 * 2. In the list array if doesn't exists href property then open category menus sidebar drawer in MobileNaviagationBar2
 */

const MobileNavigationBar2: FC<Props> = ({ children }) => {
	const { t } = useTranslation('common')

	const width = useWindowSize()
	const { state } = useAppContext()
	const [open, setOpen] = useState(false)

	const { mobileNavHeight, topbarHeight } = layoutConstant
	const total = mobileNavHeight + topbarHeight
	const [totalHeight, setTotalHeight] = useState<number>(total)

	const handleDrawerOpen = () => setOpen(true)
	const handleDrawerClose = () => setOpen(false)

	useEffect(() => {
		const listner = () => {
			if (window.scrollY > 30) setTotalHeight(mobileNavHeight)
			else setTotalHeight(total)
		}

		window.addEventListener('scroll', listner)
		return () => window.removeEventListener('scroll', listner)
	}, [])

	return width <= 900 ? (
		<Box position="relative" display="flex" flexDirection="column">
			<StyledDrawer
				open={open}
				anchor="left"
				totalheight={totalHeight}
				onClose={handleDrawerClose}
			>
				{children}
			</StyledDrawer>

			<Wrapper>
				{list?.map((item) => {
					if (item.href) {
						return (
							<StyledNavLink href={item.href} key={item.title}>
								{item.title === 'Cart' && (
									<Badge badgeContent={state.cart?.length} color="primary">
										<item.icon fontSize="small" sx={iconStyle} />
									</Badge>
								)}

								{item.title !== 'Cart' && (
									<item.icon sx={iconStyle} fontSize="small" />
								)}
								{item.title}
							</StyledNavLink>
						)
					} else {
						return (
							<StyledBox
								onClick={open ? handleDrawerClose : handleDrawerOpen}
								key={item.title}
							>
								{item.title === 'Cart' && (
									<Badge badgeContent={state.cart?.length} color="primary">
										<item.icon fontSize="small" sx={iconStyle} />
									</Badge>
								)}

								{item.title !== 'Cart' && (
									<item.icon sx={iconStyle} fontSize="small" />
								)}
								{t(item.title)}
							</StyledBox>
						)
					}
				})}
			</Wrapper>
		</Box>
	) : null
}

const list = [
	{ title: 'home', icon: Home, href: '/' },
	{ title: 'category', icon: CategoryOutlined },
	{ title: 'cart', icon: ShoppingBagOutlined, href: '/cart' },
	{ title: 'profile', icon: User2, href: '/profile' },
]

export default MobileNavigationBar2
