import { KeyboardArrowDown, PersonOutline } from '@mui/icons-material'
import { Avatar, Badge, Box, Drawer, styled } from '@mui/material'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import clsx from 'clsx'
import BazaarButton from 'src/components/BazaarButton'
import Image from 'src/components/BazaarImage'
import CategoryMenu from 'src/components/categories/CategoryMenu'
import { FlexBox } from 'src/components/flex-box'
import Category from 'src/components/icons/Category'
import ShoppingBagOutlined from 'src/components/icons/ShoppingBagOutlined'
import MiniCart from 'src/components/mini-cart/MiniCart'
import MobileMenu from 'src/components/navbar/MobileMenu'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { layoutConstant } from 'src/utils/constants'

import SearchBox from '../search-box/SearchBox'
import { useSession } from 'next-auth/react'

export const HeaderWrapper = styled(Box)(({ theme }) => ({
	zIndex: 3,
	position: 'relative',
	height: layoutConstant.headerHeight,
	transition: 'height 250ms ease-in-out',
	background: theme.palette.background.paper,
	[theme.breakpoints.down('sm')]: {
		height: layoutConstant.mobileHeaderHeight,
	},
}))

type HeaderProps = {
	isFixed?: boolean
	className?: string
	searchBoxType?: 'type1' | 'type2'
}

const Header: FC<HeaderProps> = ({
	isFixed,
	className,
	searchBoxType = 'type1',
}) => {
	const cart = useTypedSelector((state) => state.cartStore.cart)
	const user = useTypedSelector((state) => state.userStore.user)

	const { data: session, status } = useSession()

	const { push } = useRouter()
	const theme = useTheme()
	// const [dialogOpen, setDialogOpen] = useState(false)
	const [sidenavOpen, setSidenavOpen] = useState(false)

	const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
	const downMd = useMediaQuery(theme.breakpoints.down(1150))
	const router = useRouter()

	// const toggleDialog = () => setDialogOpen(!dialogOpen)

	const is_auth = status === 'authenticated'

	const redirect = () => {
		if (is_auth) {
			push('/profile')
		}
		setSidenavOpen(false)
	}

	const toggleSidenav = () => setSidenavOpen(!sidenavOpen)

	const handleLogin = () => {
		push(`/login/?redirect=${router.asPath}`)
	}

	return (
		cart && (
			<HeaderWrapper className={clsx(className)}>
				<Container
					sx={{
						gap: 2,
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<FlexBox
						mr={2}
						minWidth="170px"
						alignItems="center"
						sx={{ display: { xs: 'none', md: 'flex' } }}
					>
						<Link href="/">
							<a>
								<Image height={44} src="/assets/images/logo.svg" alt="logo" />
							</a>
						</Link>

						{isFixed && (
							<CategoryMenu>
								<FlexBox color="grey.600" alignItems="center" ml={2}>
									<BazaarButton color="inherit">
										<Category fontSize="small" color="inherit" />
										<KeyboardArrowDown fontSize="small" color="inherit" />
									</BazaarButton>
								</FlexBox>
							</CategoryMenu>
						)}
					</FlexBox>

					<FlexBox justifyContent="center" flex="1 1 0">
						<SearchBox />
					</FlexBox>

					<FlexBox
						alignItems="center"
						sx={{ display: { xs: 'none', md: 'flex' } }}
					>
						<Box
							p={0.5}
							bgcolor="grey.200"
							sx={{
								border: is_auth ? '2px solid' : 'none',
								borderColor: is_auth ? 'success.main' : 'transparent',
								borderRadius: '50%',
								cursor: 'pointer',
								width: 44,
								height: 44,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
							onClick={is_auth ? redirect : handleLogin}
						>
							{is_auth ? (
								<Avatar
									src={user?.avatar || '/assets/images/avatars/001-man.svg'}
								/>
							) : (
								<PersonOutline />
							)}
						</Box>

						<Badge badgeContent={cart.length} color="primary">
							<Box
								border={cart.length > 0 ? '2px solid' : 'none'}
								borderColor={cart.length > 0 ? 'primary.main' : 'transparent'}
								ml={2}
								width={44}
								height={44}
								bgcolor="grey.200"
								component={IconButton}
								onClick={toggleSidenav}
							>
								<ShoppingBagOutlined />
							</Box>
						</Badge>
					</FlexBox>

					<Drawer
						open={sidenavOpen}
						anchor="right"
						onClose={toggleSidenav}
						sx={{
							zIndex: 1600,
						}}
					>
						<MiniCart />
					</Drawer>

					{downMd && <MobileMenu />}
				</Container>
			</HeaderWrapper>
		)
	)
}

export default Header
