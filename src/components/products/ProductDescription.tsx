import { Box } from '@mui/material'
import { H3 } from 'src/components/Typography'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'


// ======================================================
type ProductDescriptionProps = {
	desc: string
}
// ======================================================

const ProductDescription: FC<ProductDescriptionProps> = ({desc}) => {
	const { t } = useTranslation('review')
	return (
		<Box>
			<H3 mb={2}>Описание товара:</H3>
			<Box>
				{desc}
			</Box>
		</Box>
	)
}

export default ProductDescription
