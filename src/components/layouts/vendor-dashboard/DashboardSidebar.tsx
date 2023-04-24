import { Avatar, Box, Theme, useMediaQuery } from '@mui/material'
import Scrollbar from 'src/components/Scrollbar'
import { FlexBetween } from 'src/components/flex-box'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'

import LayoutDrawer from '../LayoutDrawer'

import {
	BadgeValue,
	BulletIcon,
	ChevronLeftIcon,
	ExternalLink,
	ListIconWrapper,
	ListLabel,
	NavItemButton,
	NavWrapper,
	SidebarWrapper,
	StyledText,
} from './LayoutStyledComponents'
import { navigations } from './NavigationList'
import SidebarAccordion from './SidebarAccordion'

const TOP_HEADER_AREA = 0

// -----------------------------------------------------------------------------
type DashboardSidebarProps = {
	sidebarCompact: any
	showMobileSideBar: any
	setSidebarCompact: () => void
	setShowMobileSideBar: () => void
}
// -----------------------------------------------------------------------------

const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
	const { t } = useTranslation('admin')
	const {
		sidebarCompact,
		showMobileSideBar,
		setShowMobileSideBar,
		setSidebarCompact,
	} = props

	const user = useTypedSelector((state) => state.userStore.user)
	const [accessNavs, setAccessNavs] = useState<any>(
		!user.is_superuser
			? navigations.filter((nav) => nav.role === 'vendor')
			: navigations
	)
	const router = useRouter()
	const [onHover, setOnHover] = useState(false)
	const downLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

	// side hover when side bar is compacted
	const COMPACT = sidebarCompact && !onHover ? 1 : undefined
	// handle active current page
	const activeRoute = (path: string) =>
		router.pathname === path ? 1 : undefined

	// handle navigate to another route and close sidebar drawer in mobile device
	const handleNavigation = (path: string) => {
		router.push(path)
		setShowMobileSideBar()
	}

	const renderLevels = (data: any) => {
		return data?.map((item: any, index: any) => {
			if (item.type === 'label')
				return (
					<ListLabel key={index} compact={COMPACT}>
						{t(item.label)}
					</ListLabel>
				)

			if (item.children) {
				return (
					<SidebarAccordion key={index} item={item} sidebarCompact={COMPACT}>
						{renderLevels(item.children)}
					</SidebarAccordion>
				)
			} else if (item.type === 'extLink') {
				return (
					<ExternalLink
						key={index}
						href={item.path}
						rel="noopener noreferrer"
						target="_blank"
					>
						<NavItemButton key={item.name} name="child" active={0}>
							{item.icon ? (
								<ListIconWrapper>
									<item.icon />
								</ListIconWrapper>
							) : (
								<span className="item-icon icon-text">{item.iconText}</span>
							)}

							<StyledText compact={COMPACT}>{t(item.name)}</StyledText>

							{/* <Box mx="auto" /> */}

							{item.badge && (
								<BadgeValue compact={COMPACT}>{item.badge.value}</BadgeValue>
							)}
						</NavItemButton>
					</ExternalLink>
				)
			} else {
				return (
					<Box key={index}>
						<NavItemButton
							key={item.name}
							className="navItem"
							active={activeRoute(item.path)}
							onClick={() => handleNavigation(item.path)}
						>
							{item?.icon ? (
								<ListIconWrapper>
									<item.icon />
								</ListIconWrapper>
							) : (
								<BulletIcon active={activeRoute(item.path)} />
							)}

							<StyledText compact={COMPACT}>{t(item.name)}</StyledText>

							{/* <Box mx="auto" /> */}

							{item.badge && (
								<BadgeValue compact={COMPACT}>{item.badge.value}</BadgeValue>
							)}
						</NavItemButton>
					</Box>
				)
			}
		})
	}

	const content = (
		<Scrollbar
			autoHide
			clickOnTrack={false}
			sx={{
				position: 'relative',
				overflowX: 'hidden',
				maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)`,
			}}
		>
			<NavWrapper compact={sidebarCompact}>
				{renderLevels(accessNavs)}
			</NavWrapper>
			<Box
				sx={{
					position: 'sticky',
					bottom: 0,
					left: 0,
					width: '100%',
					height: `70px`,
					background: 'linear-gradient(0deg, #2B3445 30%, #00000000 100%)',
				}}
			></Box>
		</Scrollbar>
	)

	if (downLg) {
		return (
			<LayoutDrawer open={showMobileSideBar} onClose={setShowMobileSideBar}>
				<Box p={2} maxHeight={TOP_HEADER_AREA}>
					<Image
						alt="Logo"
						width={60}
						height={30}
						src="/assets/images/logoWhite.svg"
						style={{ marginLeft: 8 }}
					/>
				</Box>
				{content}
			</LayoutDrawer>
		)
	}

	return (
		<SidebarWrapper
			compact={sidebarCompact ? 1 : undefined}
			onMouseEnter={() => setOnHover(true)}
			onMouseLeave={() => sidebarCompact && setOnHover(false)}
		>
			{/* <FlexBetween
				p={2}
				maxHeight={TOP_HEADER_AREA}
				justifyContent={COMPACT ? 'center' : 'space-between'}
			>
				<Avatar
					src={
						COMPACT
							? '/assets/images/logoCompact.svg'
							: '/assets/images/logoWhite.svg'
					}
					sx={{
						borderRadius: 0,
						width: 'auto',
						marginLeft: COMPACT ? undefined : 1,
					}}
					onClick={() => handleNavigation('/')}
				/>

				<ChevronLeftIcon
					color="disabled"
					compact={COMPACT}
					onClick={setSidebarCompact}
					sidebarcompact={sidebarCompact ? 1 : undefined}
				/>
			</FlexBetween> */}

			{content}
		</SidebarWrapper>
	)
}

export default DashboardSidebar
