import { Box, Container, Grid, styled } from '@mui/material'
import { axiosClassic } from 'src/api/interceptor'
import AppStore from 'src/components/AppStore'
import BazaarIconButton from 'src/components/BazaarIconButton'
import Image from 'src/components/BazaarImage'
import { Paragraph } from 'src/components/Typography'
import { FlexBox } from 'src/components/flex-box'
import Facebook from 'src/components/icons/Facebook'
import Google from 'src/components/icons/Google'
import Instagram from 'src/components/icons/Instagram'
import Twitter from 'src/components/icons/Twitter'
import Youtube from 'src/components/icons/Youtube'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'
import { useQueries, useQuery } from 'react-query'
import { ISiteSettings } from 'src/shared/types/site-settings.types'
import { SiteSettings } from 'src/utils/constants/site-settings'

// styled component
const StyledLink = styled('a')(({ theme }) => ({
	display: 'block',
	borderRadius: 4,
	cursor: 'pointer',
	position: 'relative',
	padding: '0.3rem 0rem',
	color: theme.palette.grey[500],
	'&:hover': { color: theme.palette.grey[100] },
}))

const Footer: FC = () => {
	const { t } = useTranslation('common')
	const { data: settings } = useQuery(
		'get site settings',
		() => axiosClassic.get('/settings/').then((response) => response.data),
		{
			staleTime: 1000 * 60 * 10,
			cacheTime: 1000 * 60 * 10,
		}
	)

	const { '0': about, '1': customer } = useQueries([
		{
			queryKey: ['about us'],
			queryFn: () =>
				axiosClassic
					.get('/pages/categories/about-us/')
					.then((response) => response.data),
			staleTime: 1000 * 60 * 10,
			cacheTime: 1000 * 60 * 10,
		},
		{
			queryKey: ['customer care'],
			queryFn: () =>
				axiosClassic
					.get('/pages/categories/customer-care/')
					.then((response) => response.data),
			staleTime: 1000 * 60 * 10,
			cacheTime: 1000 * 60 * 10,
		},
	])

	return (
		<footer>
			<Box bgcolor="#222935">
				<Container sx={{ p: '1rem', color: 'white' }}>
					<Box py={10} overflow="hidden">
						<Grid container spacing={3}>
							<Grid item lg={4} md={6} sm={6} xs={12}>
								<Link href="/">
									<a>
										<Image
											mb={2.5}
											src="/assets/images/logoWhite.svg"
											alt="logo"
										/>
									</a>
								</Link>

								<Paragraph mb={2.5} color="grey.500">
									{settings?.short_description ||
										SiteSettings.short_description}
								</Paragraph>

								{/* <AppStore /> */}
							</Grid>

							<Grid item lg={2} md={6} sm={6} xs={12}>
								<Box
									fontSize="18px"
									fontWeight="600"
									mb={1.5}
									lineHeight="1"
									color="white"
								>
									{about.data?.title}
								</Box>

								<div>
									{about.data?.pages?.map((item) => (
										<Link href={`/page/${item.id}`} key={item.id} passHref>
											<StyledLink>{item.title}</StyledLink>
										</Link>
									))}
								</div>
							</Grid>

							<Grid item lg={3} md={6} sm={6} xs={12}>
								<Box
									fontSize="18px"
									fontWeight="600"
									mb={1.5}
									lineHeight="1"
									color="white"
								>
									{customer.data?.title}
								</Box>

								<div>
									{customer.data?.pages?.map((item) => (
										<Link href={`/page/${item.id}`} key={item.id} passHref>
											<StyledLink>{item.title}</StyledLink>
										</Link>
									))}
								</div>
							</Grid>

							<Grid item lg={3} md={6} sm={6} xs={12}>
								<Box
									fontSize="18px"
									fontWeight="600"
									mb={1.5}
									lineHeight="1"
									color="white"
								>
									{t('contactUs')}
								</Box>
								<Box py={0.6} color="grey.500">
									{settings?.short_description ||
										SiteSettings.short_description}
								</Box>
								<Box py={0.6} color="grey.500">
									{t('address')}: {settings?.address || SiteSettings.address}
								</Box>
								<Box py={0.6} color="grey.500">
									Email: {settings?.email || SiteSettings.email}
								</Box>
								<Box py={0.6} mb={2} color="grey.500">
									{t('phone')}:{' '}
									{settings?.footer_phone || SiteSettings.footer_phone}
								</Box>

								<FlexBox className="flex" mx={-0.625}>
									{iconList?.map((item, ind) => (
										<a
											href={
												settings
													? settings[item.key] === '#'
														? SiteSettings[item.key]
														: settings[item.key]
													: SiteSettings[item.key]
											}
											target="_blank"
											rel="noreferrer noopenner"
											key={ind}
										>
											<BazaarIconButton
												m={0.5}
												bgcolor="rgba(0,0,0,0.2)"
												fontSize="12px"
												padding="10px"
											>
												<item.icon fontSize="inherit" />
											</BazaarIconButton>
										</a>
									))}
								</FlexBox>
							</Grid>
						</Grid>
					</Box>
				</Container>
			</Box>
		</footer>
	)
}

const aboutLinks = [
	'Careers',
	'Our Stores',
	'Our Cares',
	'Terms & Conditions',
	'Privacy Policy',
]

const customerCareLinks = [
	'Help Center',
	'How to Buy',
	'Track Your Order',
	'Corporate & Bulk Purchasing',
	'Returns & Refunds',
]

const iconList = [
	{ icon: Facebook, key: 'facebook' },
	{ icon: Twitter, key: 'twitter' },
	{ icon: Youtube, key: 'youtube' },
	{ icon: Google, key: 'gmail' },
	{ icon: Instagram, key: 'instagram' },
]

export default Footer
