import { FC, useEffect } from 'react'
import { useQuery } from 'react-query'
import { ShopsProductsService } from 'src/api/services/products/product.service'
import { IProduct } from 'src/shared/types/product.types'
import { H2 } from '../Typography'
import ProductModalIntro from './ProductModalIntro'
import { Box } from '@mui/system'
import { Grid, Skeleton } from '@mui/material'
import { FlexBox } from '../flex-box'
import Loading from '../Loading'

type ProductModalProps = {
	id: string
}

const ProductModal: FC<ProductModalProps> = ({ id }) => {
	const { data: product, isLoading } = useQuery(
		['product detail', id],
		() => ShopsProductsService.get(id),
		{
			enabled: !!id,
			select: (data: IProduct) => data,
		}
	)

	const handleBeforeUnload = (event) => {
		event.preventDefault()
		// Ваш код для обработки события назад
	}

	return isLoading ? (
		<Loading />
	) : (
		<>{product && <ProductModalIntro product={product} />}</>
	)
}

export default ProductModal
