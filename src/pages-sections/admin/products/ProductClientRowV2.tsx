import { Delete, Edit } from '@mui/icons-material'
import {
	Box,
	FormControlLabel,
	FormGroup,
	Switch,
	Tooltip,
} from '@mui/material'
import LazyImage from 'src/components/LazyImage'
import { Paragraph, Small } from 'src/components/Typography'
import { FlexBox } from 'src/components/flex-box'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { IProductPreview } from 'src/shared/types/product.types'
import VisibilityIcon from '@mui/icons-material/Visibility'

import {
	CategoryWrapper,
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from '../StyledComponents'
import { darken } from '@mui/system'
import { getCurrency } from 'src/utils/getCurrency'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { localize } from 'src/utils/Translate/localize'
import SuccessNotify from 'src/components/SuccessNotify/SuccessNotify'
import { v4 } from 'uuid'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { api } from 'src/api/index.service'

// ========================================================================
type ProductRowProps = {
	product: IProductPreview
	refetch: () => void
	is_superuser?: boolean
	switchPublish?: (id: string, is_published: boolean) => Promise<void>
}
// ========================================================================

const ProductRowV2: FC<ProductRowProps> = ({
	product,
	refetch,
	is_superuser,
	switchPublish,
}) => {
	const { category, name, thumbnail, shop, price, id } = product
	const [isPublished, setIsPublished] = useState(false)
	const [publishLoaded, setPublishLoaded] = useState(null)
	const [parent, enableAnimate] = useAutoAnimate()

	const router = useRouter()

	const handleSwitchPublish = (id: string, is_published: boolean) => {
		setIsPublished(is_published)
		switchPublish(id, is_published).then(() => {
			setPublishLoaded(v4())
		})
	}

	useEffect(() => {
		setIsPublished(product.is_published)
	}, [product.is_published])

	const onDelete = async () => {
		if (
			window.confirm(
				localize({
					ru: 'Вы действительно хотите удалить товар?',
					tr: 'Gerçekten ürünü silmek istiyor musunuz?',
					en: 'Are you sure you want to delete the product?',
				})
			)
		) {
			try {
				await api.products.ProductsService.delete(id)
				refetch()
			} catch (e: unknown) {
				console.error(e)
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
				align="left"
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
						<Paragraph
							sx={{
								lineHeight: '1.2',
							}}
						>
							{name}
						</Paragraph>
					</Box>
				</FlexBox>
			</StyledTableCell>

			<StyledTableCell
				align="center"
				onClick={() => router.push(`${router.pathname}/${id}`)}
			>
				{getCurrency(price)}
			</StyledTableCell>

			<StyledTableCell
				align="left"
				onClick={() => router.push(`${router.pathname}/${id}`)}
			>
				<CategoryWrapper>{category.name || category}</CategoryWrapper>
			</StyledTableCell>

			<StyledTableCell
				align="left"
				onClick={() => router.push(`${router.pathname}/${id}`)}
			>
				<Box
					sx={{
						display: 'inline-block',
						backgroundColor: 'grey.300',
						color: 'block',
						padding: '0.3rem',
						fontSize: '0.8rem',
						borderRadius: '0.3rem',
						transition: 'all 0.2s ease-in-out',
					}}
				>
					{shop?.name && shop?.name}
				</Box>
			</StyledTableCell>

			<StyledTableCell align="center">
				<Box
					sx={{
						position: 'relative',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						margin: '0 auto',
					}}
				>
					<FormGroup
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							whiteSpace: 'nowrap',
							width: '180px',
						}}
					>
						<FormControlLabel
							sx={{
								margin: 0,
							}}
							control={
								<Switch
									checked={isPublished}
									onChange={() =>
										handleSwitchPublish(id, !product?.is_published)
									}
									color="success"
								/>
							}
							label={
								isPublished
									? localize({
											ru: 'Опубликовано',
											tr: 'Yayınlandı',
											en: 'Published',
									  })
									: localize({
											ru: 'Не опубликовано',
											tr: 'Yayınlanmadı',
											en: 'Not published',
									  })
							}
						/>
					</FormGroup>
					<SuccessNotify toggleOpen={publishLoaded} />
				</Box>
			</StyledTableCell>

			<StyledTableCell align="center">
				<StyledIconButton onClick={() => router.push(`/product/${id}/`)}>
					<Tooltip
						title={localize({
							ru: 'Предпросмотр',
							tr: 'Önizleme',
							en: 'Preview',
						})}
					>
						<VisibilityIcon color="secondary" />
					</Tooltip>
				</StyledIconButton>

				{!is_superuser && (
					<StyledIconButton onClick={onDelete}>
						<Tooltip
							title={localize({
								ru: 'Удалить',
								tr: 'Sil',
								en: 'Delete',
							})}
						>
							<Delete color="error" />
						</Tooltip>
					</StyledIconButton>
				)}
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default ProductRowV2
