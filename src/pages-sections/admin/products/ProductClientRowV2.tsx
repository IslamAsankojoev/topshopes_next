import { Delete, Edit } from '@mui/icons-material'
import {
	Box,
	FormControlLabel,
	FormGroup,
	Switch,
	Tooltip,
} from '@mui/material'
import { ProductsService } from 'src/api/services/products/product.service'
import LazyImage from 'src/components/LazyImage'
import { Paragraph, Small } from 'src/components/Typography'
import { FlexBox } from 'src/components/flex-box'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { toast } from 'react-toastify'
import { IProductPreview } from 'src/shared/types/product.types'
import VisibilityIcon from '@mui/icons-material/Visibility'

import {
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from '../StyledComponents'
import { darken } from '@mui/system'
import { getCurrency } from 'src/utils/getCurrency'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { localize } from 'src/utils/Translate/localize'

// ========================================================================
type ProductRowProps = {
	product: IProductPreview
	refetch: () => void
	is_superuser?: boolean
	handleSwitchPublish?: (id: string, is_pablished: boolean) => void
}
// ========================================================================

const ProductRowV2: FC<ProductRowProps> = ({
	product,
	refetch,
	is_superuser,
	handleSwitchPublish,
}) => {
	const { category, name, thumbnail, shop, price, id } = product

	const router = useRouter()

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

	return (
		<StyledTableRow
			tabIndex={-1}
			role="checkbox"
			sx={{
				cursor: 'pointer',
				transition: 'all 0.2s ease-in-out',
				'&:hover': {
					backgroundColor: 'grey.200',
				},
			}}
		>
			<StyledTableCell
				align="center"
				onClick={() => router.push(`${router.pathname}/${id}`)}
			>
				<FlexBox alignItems="center" gap={1.5}>
					<LazyImage
						src={thumbnail}
						width={50}
						height={50}
						sx={{ borderRadius: '8px' }}
					/>
					<Box>
						<Paragraph>{name}</Paragraph>
					</Box>
				</FlexBox>
			</StyledTableCell>

			<StyledTableCell
				align="center"
				onClick={() => router.push(`${router.pathname}/${id}`)}
			>
				{category.name || category}
			</StyledTableCell>

			<StyledTableCell
				align="center"
				onClick={() => router.push(`${router.pathname}/${id}`)}
			>
				{shop?.name && shop?.name}
			</StyledTableCell>

			<StyledTableCell
				align="center"
				onClick={() => router.push(`${router.pathname}/${id}`)}
			>
				{getCurrency(price)}
			</StyledTableCell>

			<StyledTableCell align="center">
				<FormGroup
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<FormControlLabel
						control={
							<Switch
								checked={product?.is_published}
								onChange={() => handleSwitchPublish(id, !product?.is_published)}
								color="success"
							/>
						}
						label={
							product?.is_published
								? localize({
										ru: 'Опубликовано',
										tr: 'Yayınlandı',
										en: 'Published',
										kg: 'Жарияланды',
										kz: 'Жарияланды',
								  })
								: localize({
										ru: 'Не опубликовано',
										tr: 'Yayınlanmadı',
										en: 'Not published',
										kg: 'Жарияланбады',
										kz: 'Жарияланбады',
								  })
						}
					/>
				</FormGroup>
			</StyledTableCell>

			<StyledTableCell align="center">
				<StyledIconButton onClick={() => router.push(`/product/${id}/`)}>
					<Tooltip
						title={localize({
							ru: 'Предпросмотр',
							tr: 'Önizleme',
							en: 'Preview',
							kg: 'Көрүү',
							kz: 'Алдын ала қарау',
						})}
					>
						<VisibilityIcon />
					</Tooltip>
				</StyledIconButton>

				{!is_superuser && (
					<StyledIconButton onClick={onDelete}>
						<Tooltip
							title={localize({
								ru: 'Удалить',
								tr: 'Sil',
								en: 'Delete',
								kg: 'Жою',
								kz: 'Жою',
							})}
						>
							<Delete />
						</Tooltip>
					</StyledIconButton>
				)}
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default ProductRowV2
