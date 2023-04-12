import { CallOutlined, MailOutline } from '@mui/icons-material'
import { Box, Container, styled } from '@mui/material'
import Image from 'src/components/BazaarImage'
import { FlexBox } from 'src/components/flex-box'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { ISiteSettings } from 'src/shared/types/site-settings.types'
import { layoutConstant } from 'src/utils/constants'
import { SiteSettings } from 'src/utils/constants/site-settings'
import LanguagesSwitch from '../Languages/LanguagesSwitch'
import { axiosClassic } from 'src/api/interceptor'
import { Span } from '../Typography'
import { FC } from 'react'

const TopbarWrapper = styled(Box, {
	shouldForwardProp: (props) => props !== 'bgColor',
})<{ bgColor: any }>(({ theme, bgColor }) => ({
	fontSize: 12,
	height: layoutConstant.topbarHeight,
	background: bgColor || theme.palette.secondary.main,
	color: theme.palette.secondary.contrastText,
	'& .topbarLeft': {
		'& .logo': { display: 'none' },
		'& .title': { marginLeft: '10px' },
		'@media only screen and (max-width: 900px)': {
			'& .logo': { display: 'block' },
			'& > *:not(.logo)': { display: 'none' },
		},
	},
	'& .topbarRight': {
		'& .link': {
			paddingRight: 30,
			color: theme.palette.secondary.contrastText,
		},

		'@media only screen and (max-width: 900px)': {
			'& .link': { display: 'none' },
		},
	},
	'& .menuItem': { minWidth: 100 },
	'& .marginRight': { marginRight: '1.25rem' },
	'& .handler': { height: layoutConstant.topbarHeight },
	'& .smallRoundedImage': { height: 15, width: 25, borderRadius: 2 },
	'& .menuTitle': { fontSize: 12, marginLeft: '0.5rem', fontWeight: 600 },
}))

type TopbarProps = {
	bgColor?: string
	siteSettings?: ISiteSettings
}

const Topbar: FC<TopbarProps> = ({ bgColor, siteSettings }) => {
	const { data: settings } = useQuery(
		'get site settings',
		() => axiosClassic.get('/settings/').then((response) => response.data),
		{
			staleTime: 1000 * 60 * 10,
			cacheTime: 1000 * 60 * 10,
		}
	)

	return (
		<TopbarWrapper bgColor={bgColor}>
			<Container
				sx={{
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<FlexBox className="topbarLeft" alignItems="center">
					<div className="logo">
						<Link href="/" passHref>
							<Image
								display="block"
								height="28px"
								src="/assets/images/logoWhite.svg"
								alt="logo"
							/>
						</Link>
					</div>

					<FlexBox alignItems="center">
						<CallOutlined fontSize="small" />
						<Span className="title">
							{settings?.header_phone || SiteSettings.header_phone}
						</Span>
					</FlexBox>

					<FlexBox alignItems="center" ml={2.5}>
						<MailOutline fontSize="small" />
						<Span className="title">
							{settings?.support_email || SiteSettings.support_email}
						</Span>
					</FlexBox>
				</FlexBox>

				<FlexBox className="topbarRight" alignItems="center">
					<LanguagesSwitch />
				</FlexBox>
			</Container>
		</TopbarWrapper>
	)
}

export default Topbar
