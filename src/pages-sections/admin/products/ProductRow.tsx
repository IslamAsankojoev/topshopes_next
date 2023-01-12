import { Delete, Edit } from '@mui/icons-material'
import { Avatar, Box, Tooltip } from '@mui/material'
import { AdminProductsService } from 'api/services-admin/products/products.service'
import { ProductsService } from 'api/services/products/product.service'
import BazaarSwitch from 'components/BazaarSwitch'
import { Paragraph, Small } from 'components/Typography'
import { FlexBox } from 'components/flex-box'
import currency from 'currency.js'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { IProduct, IProductPreview } from 'shared/types/product.types'

import TooltipList from '../../../components/tooltip/TooltipList'
import {
	CategoryWrapper,
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from '../StyledComponents'

// ========================================================================
type ProductRowProps = { product: IProductPreview; refetch: () => void }
// ========================================================================

const ProductRow: FC<ProductRowProps> = ({ product, refetch }) => {
	const { category, name, published, slug, price, thumbnail, id } = product

	// state
	const router = useRouter()
	const [productPublish, setProductPublish] = useState<boolean>(published)

	const { mutateAsync } = useMutation(
		'update shop product',
		() => AdminProductsService.update(id, { published: !productPublish }),
		{
			onError: (e: unknown) => {
				refetch()
			},
			onSuccess: () => {},
		}
	)

	//handlers
	const onDelete = async () => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			try {
				await AdminProductsService.delete(id)
				refetch()
			} catch (e: unknown) {
				toast.error('An error has occurred')
				console.log(e)
			}
		}
	}
	const publishOnchange = async () => {
		setProductPublish((prev) => !prev)
		mutateAsync()
	}

	return (
		<StyledTableRow tabIndex={-1} role="checkbox">
			<StyledTableCell align="left">
				<FlexBox alignItems="center" gap={1.5}>
					<Avatar src={thumbnail} sx={{ borderRadius: '8px' }} />
					<Box>
						<Paragraph>{name}</Paragraph>
					</Box>
				</FlexBox>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Box>
					<Paragraph>{category?.name}</Paragraph>
				</Box>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Avatar
					src={
						'https://static.wikia.nocookie.net/bleach/images/8/8d/572Kenpachi_profile.png/revision/latest?cb=20210417222326&path-prefix=en'
					}
					sx={{ width: 55, height: 'auto', borderRadius: 0 }}
				/>
			</StyledTableCell>

			<StyledTableCell align="left">
				{currency(price, { separator: ',' }).format()}
			</StyledTableCell>

			<StyledTableCell align="left">
				<BazaarSwitch
					color="info"
					checked={productPublish}
					onChange={publishOnchange}
				/>
			</StyledTableCell>

			<StyledTableCell align="center">
				<StyledIconButton
					onClick={() => router.push(`${router.pathname}/${id}`)}
				>
					<Edit />
				</StyledIconButton>
				<StyledIconButton onClick={onDelete}>
					<Delete />
				</StyledIconButton>
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default ProductRow
