import { CallOutlined, ExpandMore, MailOutline } from '@mui/icons-material'
import { Box, Container, MenuItem, styled } from '@mui/material'
import TouchRipple from '@mui/material/ButtonBase'
import { axiosClassic } from 'api/interceptor'
import Image from 'components/BazaarImage'
import BazaarMenu from 'components/BazaarMenu'
import { Span } from 'components/Typography'
import { FlexBox } from 'components/flex-box'
import NavLink from 'components/nav-link/NavLink'
import { languages } from 'config/languages.config'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ISiteSettings } from 'shared/types/site-settings.types'
import { layoutConstant } from 'utils/constants'
import { SiteSettings } from 'utils/constants/site-settings'

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
	const { data: settings } = useQuery('get site settings', () =>
		axiosClassic.get('/settings/').then((response) => response.data)
	)
	const { replace, asPath, locale } = useRouter()

	const [language, setLanguage] = useState(locale)

	const handleLanguageClick = (lang: typeof language) => () => {
		Cookies.set('i18nextLng', lang)
		replace(asPath, asPath, { locale: lang })
	}

	useEffect(() => {
		setLanguage(locale)
	}, [locale])

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
					{/* <NavLink className="link" href="/faq">
            Theme FAQ&quot;s
          </NavLink>

          <NavLink className="link" href="/help">
            Need Help?
          </NavLink> */}

					<BazaarMenu
						handler={
							<TouchRipple className="handler marginRight">
								<Span className="menuTitle">{language.toUpperCase()}</Span>
								<ExpandMore fontSize="inherit" />
							</TouchRipple>
						}
					>
						{languages?.map((item) => (
							<MenuItem
								className="menuItem"
								key={item}
								onClick={handleLanguageClick(item)}
							>
								<Span className="menuTitle">{item.toUpperCase()}</Span>
							</MenuItem>
						))}
					</BazaarMenu>
				</FlexBox>
			</Container>
		</TopbarWrapper>
	)
}

export default Topbar
