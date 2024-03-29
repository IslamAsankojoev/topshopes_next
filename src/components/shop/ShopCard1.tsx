import { Call, East, Place } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Card,
	IconButton,
	alpha,
	styled,
} from '@mui/material'
import { H3, Span } from 'src/components/Typography'
import { FlexBetween, FlexBox } from 'src/components/flex-box'
import Link from 'next/link'

import { IShop } from 'src/shared/types/shop.types'
import { FC } from 'react'

// styled components
const ContentWrapper = styled(Box)<{ imgUrl: string }>(({ theme, imgUrl }) => ({
	color: 'white',
	backgroundSize: 'cover',
	padding: '17px 30px 56px',
	backgroundPosition: 'center',
	backgroundImage: `linear-gradient(to bottom,
    ${alpha(theme.palette.grey[900], 0.8)}, ${alpha(
		theme.palette.grey[900],
		0.8
	)}), 
    url(${imgUrl || '/assets/images/banners/cycle.png'})`,
}))

// ================================================================
type ShopCard1Props = {
	name: string
	phone: string
	rating: number
	imgUrl: string
	address: string
	shopUrl: string
	coverImgUrl: string
}
// ================================================================

const ShopCard1: FC<IShop> = (props) => {
	// props list
	const {
		address,
		cover_picture,
		email,
		id,
		name,
		phone,
		products,
		profile_picture,
		slug,
		socialLinks,
		verified,
		children,
		user,
	} = props

	return (
		<Card>
			<ContentWrapper imgUrl={cover_picture}>
				<H3 fontWeight="600" mb={1}>
					{name}
				</H3>
				{/* 
				<Rating
					value={rating || 0}
					color="warn"
					size="small"
					readOnly
					sx={{ mb: '0.75rem' }}
				/> */}

				<FlexBox mb={1} gap={1}>
					<Place fontSize="small" sx={{ fontSize: 17, mt: '3px' }} />
					<Span color="white">{address}</Span>
				</FlexBox>

				<FlexBox alignItems="center" gap={1}>
					<Call fontSize="small" sx={{ fontSize: 17 }} />
					<Span color="white">{phone}</Span>
				</FlexBox>
			</ContentWrapper>

			<FlexBetween pl={3} pr={1}>
				<Avatar
					src={profile_picture}
					sx={{
						width: 64,
						height: 64,
						mt: '-32px',
						border: '3px solid',
						borderColor: 'grey.100',
					}}
				/>
				<Link href={`shops/${id}`}>
					<a>
						<IconButton sx={{ my: 0.5 }}>
							<East
								sx={{
									fontSize: 19,
									transform: ({ direction }) =>
										`rotate(${direction === 'rtl' ? '180deg' : '0deg'})`,
								}}
							/>
						</IconButton>
					</a>
				</Link>
			</FlexBetween>
		</Card>
	)
}

export default ShopCard1
