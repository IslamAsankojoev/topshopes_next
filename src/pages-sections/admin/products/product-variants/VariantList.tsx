import {
	Box,
	Button,
	Card,
	Table,
	TableBody,
	TableContainer,
	Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { CategoriesService } from 'src/api/services/categories/category.service'
import Card1 from 'src/components/Card1'
import TableHeader from 'src/components/data-table/TableHeader'
import Empty from 'src/components/Empty'
import { FlexBetween } from 'src/components/flex-box'
import Scrollbar from 'src/components/Scrollbar'
import { useActions } from 'src/hooks/useActions'
import useMuiTable from 'src/hooks/useMuiTable'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import {
	IProductAttribute,
	IProductVariant,
} from 'src/shared/types/product.types'
import { formDataToObj } from 'src/utils/formData'
import VariantForm from './VariantForm'
import VariantRow from './VariantRow'
import { orderBy as LOrderBy } from 'lodash-es'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { localize } from 'src/utils/Translate/localize'
import { H2, H3 } from 'src/components/Typography'
import { useRouter } from 'next/router'
import { grey } from 'src/theme/themeColors'

const tableHeading = [
	{
		id: 'image',
		label: localize({
			ru: 'Изображение',
			en: 'Image',
			tr: 'Resim',
		}),
		align: 'left',
	},
	{ id: 'price', label: 'price', align: 'left' },
	{
		id: 'sale',
		label: localize({
			ru: 'Скидка',
			en: 'Sale',
			tr: 'İndirim',
		}),
		align: 'left',
	},
	{ id: 'status', label: 'status', align: 'left' },
	{ id: 'stock', label: 'stock', align: 'left' },
	{ id: 'attributes', label: 'attributes', align: 'center' },
	{ id: 'action', label: 'action', align: 'center' },
]

interface Props {
	variants: IProductVariant[]
	handleVariantChange: (variant: IProductVariant) => void
	handleVariantRemove: (id: string) => void
	handleVariantCreate: (variant: IProductVariant) => void
	handleVariantClone?: (variant: IProductVariant) => void
	cloneLoading?: null | string
	handleUpOrdering?: (
		variant: IProductVariant,
		prevVariant: IProductVariant
	) => void
	handleDownOrdering?: (
		variant: IProductVariant,
		nextVariant: IProductVariant
	) => void
}

const VariantList: FC<Props> = ({
	variants,
	handleVariantChange,
	handleVariantRemove,
	handleVariantCreate,
	handleVariantClone,
	cloneLoading,
	handleUpOrdering,
	handleDownOrdering,
}) => {
	const { t: adminT } = useTranslation('admin')

	const [variantFormOpen, setVariantFormOpen] = useState(false)
	const [parent, enableAnimations] = useAutoAnimate()
	const user = useTypedSelector((state) => state.userStore.user)
	const router = useRouter()

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({
			listData: variants,
			perPage: 1000,
		})

	const handleCreateForm = (data: IProductVariant) => {
		handleVariantCreate(data)
		setVariantFormOpen(false)
	}

	const filteredListLodash = LOrderBy(filteredList, 'ordering')

	const handleUpOrderingRow = (variant: IProductVariant, mapIndex: number) => {
		const currentVariantIndex = filteredListLodash.findIndex(
			(v: IProductVariant) => v.id === variant.id
		)
		handleUpOrdering(
			{
				...variant,
				ordering: mapIndex,
			},
			{
				...filteredListLodash[currentVariantIndex - 1],
				ordering: mapIndex - 1,
			}
		)
	}

	const handleDownOrderingRow = (
		variant: IProductVariant,
		mapIndex: number
	) => {
		const currentVariantIndex = filteredListLodash.findIndex(
			(v: IProductVariant) => v.id === variant.id
		)
		handleDownOrdering(
			{
				...variant,
				ordering: mapIndex,
			},
			{
				...filteredListLodash[currentVariantIndex + 1],
				ordering: mapIndex + 1,
			}
		)
	}

	return (
		<>
			<FlexBetween my={4}>
				{!!variants.length ? (
					<>
						<H3>{adminT('productVariants')}</H3>
						<span
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								margin: '10px',
							}}
						>
							<Button
								color="primary"
								variant="contained"
								size="normal"
								onClick={() =>
									setVariantFormOpen((prev) => {
										return !prev
									})
								}
								disabled={false}
								sx={{
									'@media screen and (max-width: 600px)': {},
									boxShadow: 'none',
								}}
							>
								<AddIcon fontSize="small" />
								{localize({
									ru: 'Вариант',
									tr: 'Varyant',
									en: 'Variant',
								})}
							</Button>
						</span>
					</>
				) : null}
			</FlexBetween>

			<VariantForm
				handleFormSubmit={handleCreateForm}
				open={variantFormOpen}
				setOpen={setVariantFormOpen}
			/>

			{!!variants.length ? (
				<Card
					sx={{
						position: 'relative',
					}}
				>
					<Scrollbar>
						<TableContainer sx={{ minWidth: 900 }}>
							<Table>
								<TableHeader
									order={order}
									hideSelectBtn
									orderBy={orderBy}
									heading={tableHeading}
									rowCount={variants?.length}
									numSelected={selected?.length}
									onRequestSort={handleRequestSort}
								/>
								<TableBody ref={parent}>
									{filteredListLodash.map((variant, index) => (
										<VariantRow
											mapIndex={index}
											key={variant.id}
											variant={variant}
											variantFormOpen={variantFormOpen}
											enableAnimations={enableAnimations}
											handleChange={handleVariantChange}
											handleRemove={handleVariantRemove}
											handleClone={handleVariantClone}
											cloneLoading={cloneLoading}
											handleUpOrdering={handleUpOrderingRow}
											handleDownOrdering={handleDownOrderingRow}
										/>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>
				</Card>
			) : (
				<Empty>
					<span>
						<Typography
							color="grey.700"
							textAlign="center"
							padding="0px 20px"
							fontSize="25px"
							fontWeight="bold"
							margin="10px 0px 0px 0px"
						>
							{adminT('productVariants')}
						</Typography>
						<Typography
							color="grey.600"
							textAlign="center"
							padding="0px 20px"
							margin="0px 0px 20px 0px"
						>
							{localize({
								ru: 'Варианты не добавлены, добавьте вариант перед тем как создать товар',
								tr: 'Varyantlar eklenmedi, ürün oluşturmadan önce varyant ekleyin',
								en: 'Variants are not added, add a variant before creating a product',
								kg: 'Варианттар кошулган жок, маалымат кошулгандан мурун вариант кошуңуз',
								kz: 'Варианттар қосылған жоқ, маалымат қосылғандан мурун вариант қосуңыз',
							})}
						</Typography>
					</span>
					<Button
						color="primary"
						variant="contained"
						size="medium"
						onClick={() =>
							setVariantFormOpen((prev) => {
								return !prev
							})
						}
						disabled={false}
					>
						{localize({
							ru: 'Добавить вариант',
							tr: 'Varyant Ekle',
							en: 'Add Variant',
							kg: 'Вариант кошуруу',
							kz: 'Вариант қосу',
						})}
					</Button>
				</Empty>
			)}
			{router.pathname.includes('admin') && user.is_superuser ? (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'flex-start',
						position: 'absolute',
						top: 0,
						left: 0,
						paddingTop: '150px',
						width: '100%',
						height: '100%',
						// backgroundColor: 'rgba(0, 0, 0,0.6)',
						backdropFilter: 'blur(0px)',
						zIndex: 1,
						cursor: 'not-allowed ',
						transition: 'all 0.3s ease',
						'&:hover': {
							backgroundColor: 'rgba(82, 82, 82,0.2)',
							// backgroundColor: '#F7F9FC',
							backdropFilter: 'blur(3px)',
							// boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.5)',
						},
						'&:hover > p': {
							color: 'white',
							backgroundColor: 'rgba(0, 0, 0, 0.8)',
						},
						'& > p': {
							transition: 'all 0.3s ease',
							color: 'transparent',
						},
					}}
				>
					<Typography
						sx={{
							color: 'black',
							fontSize: '25px',
							fontWeight: 'bold',
							padding: '20px 40px',
							borderRadius: '5px',
							position: 'sticky!important',
							top: '0!important',
						}}
					>
						Доступ запрещен
					</Typography>
				</Box>
			) : null}
		</>
	)
}

export default VariantList
