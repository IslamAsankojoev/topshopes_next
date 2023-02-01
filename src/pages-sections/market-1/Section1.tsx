import { Box, Container } from '@mui/material'
import CarouselCard1 from 'components/carousel-cards/CarouselCard1'
import Carousel from 'components/carousel/Carousel'
import Models from 'models'
import { NextPage } from 'next'

export const mainCarouselData = [
	{
		title: 'Beauty and Fragrance in Your Home',
		imgUrl: '/assets/images/products/slider1.webp',
		description:
			'Transform your living space into a haven of relaxation and rejuvenation with our range of scented candles, diffusers, and sprays.',
		buttonText: 'Shop Now',
		buttonLik: '#',
	},
	{
		title: 'Create a Cozy Atmosphere with Home Scents',
		imgUrl: '/assets/images/products/slider2.webp',
		description:
			'Discover the perfect scent to match your mood and elevate your home décor with our hand-selected collection of fragrances.',
		buttonText: 'Shop Now',
		buttonLik: '#',
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
					totalSlides={2}
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
