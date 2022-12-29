import { Delete, Edit } from '@mui/icons-material'
import { Avatar, Box, Tooltip } from '@mui/material'
import BazaarSwitch from 'components/BazaarSwitch'
import { FlexBox } from 'components/flex-box'
import { Paragraph, Small } from 'components/Typography'
import currency from 'currency.js'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import {
	CategoryWrapper,
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from '../StyledComponents'
import { toast } from 'react-toastify'
import TooltipList from '../../../components/tooltip/TooltipList'
import { ProductsService } from 'api/services/products/product.service'
import { useMutation } from 'react-query'
import { AdminProductsService } from 'api/services-admin/products/products.service'

// ========================================================================
type ProductRowProps = { product: any; refetch: () => void }
// ========================================================================

const ProductRow: FC<ProductRowProps> = ({ product, refetch }) => {
	const { categories, title, price, thumbnail, brand, id, published } = product

	// state
	const router = useRouter()
	const [productPublish, setProductPublish] = useState<boolean>(published)

	const { mutateAsync } = useMutation(
		'update shop product',
		() => ProductsService.update(id, { published: !productPublish }),
		{
			onError: (e: unknown) => {
				refetch()
			},
			onSuccess: () => {
				toast.success('Product updated')
			},
		}
	)

	//handlers
	const onDelete = async () => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			try {
				await ProductsService.delete(id)
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
						<Paragraph>{title}</Paragraph>
					</Box>
				</FlexBox>
			</StyledTableCell>

			<StyledTableCell align="left">
				<TooltipList
					list={categories?.length > 1 ? categories?.map((c) => c.name) : null}
				>
					<CategoryWrapper>
						{categories?.length
							? categories?.length > 1
								? categories[0].name + '...'
								: categories[0].name
							: null}
					</CategoryWrapper>
				</TooltipList>
			</StyledTableCell>

			<StyledTableCell align="left">
				<Avatar
					src={brand?.image}
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
