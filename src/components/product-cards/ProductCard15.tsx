import { Box, styled } from '@mui/material'
import LazyImage from 'src/components/LazyImage'
import { H6, Paragraph } from 'src/components/Typography'
import { FC } from 'react'
import { statusTranslation } from 'src/utils/Translate/common'
import { localize } from 'src/utils/Translate/localize'

const StyledCard = styled(Box)(({ theme }) => ({
	textAlign: 'center',
	transition: 'all 0.3s',
	'&:hover': {
		'& h6': { color: theme.palette.primary.main },
	},
}))

const ImgBox = styled(Box)(({ theme }) => ({
	padding: '0 40px 20px 40px',
	background: theme.palette.primary[100],
}))

// ===================================================
type Props = {
	title: string
	imgUrl: string
	available: string
	sx?: { [key: string]: any }
}
// ===================================================

const ProductCard15: FC<Props> = (props) => {
	const { sx, imgUrl, title, available } = props

	return (
		<StyledCard sx={sx}>
			<ImgBox>
				<LazyImage
					src={imgUrl}
					width={100}
					height={100}
					layout="responsive"
					objectFit="contain"
				/>
			</ImgBox>

			<H6 fontSize={15} mt="8px" mb="2px">
				{title}
			</H6>
			<Paragraph color="grey.600">
				{localize(statusTranslation[available])}
			</Paragraph>
		</StyledCard>
	)
}

export default ProductCard15
