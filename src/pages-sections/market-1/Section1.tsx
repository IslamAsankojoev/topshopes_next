import { Box, Container } from '@mui/material'
import CarouselCard1 from 'src/components/carousel-cards/CarouselCard1'
import Carousel from 'src/components/carousel/Carousel'
import Models from 'src/models'
import { NextPage } from 'next'
import useWindowSize from 'src/hooks/useWindowSize'


// ======================================================
type Props = { carouselData: Models['MainCarouselItem'][] }
// ======================================================

const Section1: NextPage<Props> = ({ carouselData }) => {
	
const width = useWindowSize()

	const mainCarouselData = [
		{
			imgUrl: width > 991 ? '/assets/images/products/topshopes2.webp' : '/assets/images/products/mobil1.webp',
		},
		{
			imgUrl: width > 991 ? '/assets/images/products/topshopes3.webp' : '/assets/images/products/mobil3.webp',
		},
		{
			imgUrl: width > 991 ? '/assets/images/products/topshopes1.webp' : '/assets/images/products/mobil2.webp'
		},
	]
	
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
