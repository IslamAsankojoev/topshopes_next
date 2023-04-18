/* eslint-disable react-hooks/exhaustive-deps */
import {
	Box,
	Card,
	Container,
	Grid,
	IconButton,
	Tab,
	Tabs,
	styled,
} from '@mui/material'
import BazaarButton from 'src/components/BazaarButton'
import BazaarRating from 'src/components/BazaarRating'
import LazyImage from 'src/components/LazyImage'
import { H1, H2, H6 } from 'src/components/Typography'
import { useActions } from 'src/hooks/useActions'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import {
	IProduct,
	IProductPreview,
	IProductVariant,
} from 'src/shared/types/product.types'

import { FlexBox } from '../flex-box'

import Variables from './Variables'
import { localize } from 'src/utils/Translate/localize'
import Favorite from '@mui/icons-material/Favorite'
import { getCurrency } from 'src/utils/getCurrency'
import { FavoriteBorder } from '@mui/icons-material'
import ShopLayout1 from '../layouts/ShopLayout1'
import ProductIntro from './ProductIntro'
import { useQuery } from 'react-query'
import { ShopsProductsService } from 'src/api/services/products/product.service'
import ProductDescription from './ProductDescription'
import ProductReview from './ProductReview'

const StyledTabs = styled(Tabs)(({ theme }) => ({
	minHeight: 0,
	marginTop: 80,
	marginBottom: 24,
	borderBottom: `1px solid ${theme.palette.text.disabled}`,
	'& .inner-tab': {
		minHeight: 40,
		fontWeight: 600,
		textTransform: 'capitalize',
	},
}))

type ProductModalIntroProps = {
	product?: IProduct
}

const ProductModalIntro: FC<ProductModalIntroProps> = ({ product }) => {
	const { t } = useTranslation('common')
	const { query } = useRouter()

	const [selectedOption, setSelectedOption] = useState(0)

	const handleOptionClick = (_, value: number) => setSelectedOption(value)

	useEffect(() => {
		query.comment === 'success' && setSelectedOption(1)
	}, [query])

	return (
		<ShopLayout1>
			<Container sx={{ my: 4 }}>
				{product ? <ProductIntro product={product} /> : <H2>Loading...</H2>}

				<StyledTabs
					textColor="primary"
					value={selectedOption}
					indicatorColor="primary"
					onChange={handleOptionClick}
				>
					<Tab className="inner-tab" label={t('description')} />
					<Tab
						className="inner-tab"
						label={`${t('review')} ${
							!!product?.reviews.length ? product?.reviews.length : ''
						}`}
					/>
				</StyledTabs>

				<Box mb={6}>
					{selectedOption === 0 && (
						<ProductDescription desc={product?.description} />
					)}
					{selectedOption === 1 && <ProductReview product={product} />}
				</Box>

				{/* {frequentlyBought && <FrequentlyBought productsData={FrequentlyBought} />} */}

				{/* <AvailableShops /> */}

				{/* {relatedProducts && <RelatedProducts productsData={relatedProducts} />} */}
			</Container>
		</ShopLayout1>
	)
}

export default ProductModalIntro
