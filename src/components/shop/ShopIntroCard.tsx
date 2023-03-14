import { Call, Place } from '@mui/icons-material'
import { Avatar, Box, Button, Card, Rating } from '@mui/material'
import { FlexBetween, FlexBox } from 'src/components/flex-box'
import FacebookFilled from 'src/components/icons/FacebookFilled'
import InstagramFilled from 'src/components/icons/InstagramFilled'
import TwitterFilled from 'src/components/icons/TwitterFilled'
import YoutubeFilled from 'src/components/icons/YoutubeFilled'
import { H3, Small, Span } from 'src/components/Typography'
import { FC, useEffect } from 'react'
import { IShop } from 'src/shared/types/shop.types'
import LazyImage, { checkDomen } from '../LazyImage'

// =======================================================
type ShopIntroCardProps = {}
// =======================================================

const ShopIntroCard: FC<IShop> = ({
	name,
	cover_picture,
	email,
	address,
	id,
	phone,
	profile_picture,
	socialLinks,
	verified,
	slug,
}) => {
	return (
		<Card sx={{ mb: 4, pb: 2.5 }}>
			<Box
				height="202px"
				sx={{
					background: `url(${checkDomen(
						cover_picture as string
					)}) center/cover`,
					backgroundColor: 'grey.400',
					backgroundPosition: 'center 30%',
				}}
			/>

			<FlexBox mt={-8} px={3.75} flexWrap="wrap">
				{/* <LazyImage
					src={checkDomen(profile_picture as string)  || '/assets/images/avatars/001-man.svg'}
					width="120px"
					height="120px"
					sx={{
						mr: '37px',
						borderRadius: '50%',
						border: '4px solid',
						borderColor: 'grey.100',
						backgroundColor: 'grey.100',
						padding: '0px',
					}}
				/> */}

				<Box
					sx={{
						flex: '1 1 0',
						minWidth: '250px',
						'@media only screen and (max-width: 500px)': { marginLeft: 0 },
					}}
				>
					<FlexBetween flexWrap="wrap" mt={0.375} mb={3}>
						<Box
							my={1}
							p="4px 16px"
							borderRadius="4px"
							display="inline-block"
							bgcolor="secondary.main"
						>
							<H3 fontWeight="600" color="grey.100">
								{name}
							</H3>
						</Box>

						<FlexBox my={1} gap={1.5}>
							{socialLinks?.map((item, ind) => (
								<a
									href={item.link}
									target="_blank"
									rel="noreferrer noopener"
									key={ind}
								>
									{item.name}
								</a>
							))}
						</FlexBox>
					</FlexBetween>

					<FlexBetween flexWrap="wrap">
						<Box>
							<FlexBox alignItems="center" gap={1} mb={2}>
								<Rating color="warn" size="small" value={5} readOnly />
								<Small color="grey.600" display="block">
									(45)
								</Small>
							</FlexBox>

							<FlexBox color="grey.600" gap={1} mb={1} maxWidth={270}>
								<Place fontSize="small" sx={{ fontSize: 18, mt: '3px' }} />
								<Span color="grey.600">{address}</Span>
							</FlexBox>
						</Box>
					</FlexBetween>
				</Box>
			</FlexBox>
		</Card>
	)
}

export default ShopIntroCard
