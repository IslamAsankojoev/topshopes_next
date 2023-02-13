import { Box, Container } from '@mui/material'
import CarouselCard1 from 'components/carousel-cards/CarouselCard1'
import Carousel from 'components/carousel/Carousel'
import Models from 'models'
import { NextPage } from 'next'

export const mainCarouselData = [
	{
		imgUrl: '/assets/images/products/topshopes2.webp',
	},
	{
		imgUrl: '/assets/images/products/topshopes3.webp',
	},
	{
		imgUrl: '/assets/images/products/topshopes1.webp',
	},
]
// ======================================================
type Props = { carouselData: Models['MainCarouselItem'][] }
// ======================================================

const Section1: NextPage<Props> = ({ carouselData }) => {
	return (
		<Box bgcolor="white" mb={7.5}>
			<Container sx={{ py: 4 }}>
				<Carousel
					totalSlides={3}
					infinite={true}
					showDots={true}
					autoPlay={false}
					visibleSlides={1}
					showArrow={false}
					spacing="0px"
				>
					{mainCarouselData?.map((data, ind) => {
						return <CarouselCard1 {...data} key={ind} />
					})}
				</Carousel>
			</Container>
		</Box>
	)
}

export default Section1
