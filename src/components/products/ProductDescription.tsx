import { Box } from '@mui/material'
import { H3 } from 'components/Typography'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'


// ======================================================
type ProductDescriptionProps = {}
// ======================================================

const ProductDescription: FC<ProductDescriptionProps> = () => {
	const { t } = useTranslation('review')
	return (
		<Box>
			<H3 mb={2}>{t('specification')}:</H3>
			<Box>
				{t('brand')}: Beats <br />
				{t('model')}: S450 <br />
				Wireless Bluetooth Headset <br />
				FM Frequency Response: 87.5 – 108 MHz <br />
				Feature: FM Radio, Card Supported (Micro SD / TF) <br />
				Made in China <br />
			</Box>
		</Box>
	)
}

export default ProductDescription
