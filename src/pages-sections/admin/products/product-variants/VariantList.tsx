import {
	Box,
	Button,
	Card,
	Table,
	TableBody,
	TableContainer,
	Typography,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
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
import lodash from 'lodash'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { localize } from 'src/utils/Translate/localize'
import { H2, H3 } from 'src/components/Typography'
import { useRouter } from 'next/router'

const tableHeading = [
	{ id: 'image', label: 'image', align: 'left' },
	{ id: 'price', label: 'price', align: 'left' },
	{ id: 'sale', label: 'sale', align: 'left' },
	{ id: 'status', label: 'status', align: 'left' },
	{ id: 'stock', label: 'stock', align: 'left' },
	{ id: 'attributes', label: 'attributes', align: 'left' },
	{ id: 'action', label: 'action', align: 'center' },
]

interface Props {
	variants: IProductVariant[]
	handleVariantChange: (variant: IProductVariant) => void
	handleVariantRemove: (id: string) => void
	handleVariantCreate: (variant: IProductVariant) => void
}

const VariantList: FC<Props> = ({
	variants,
	handleVariantChange,
	handleVariantRemove,
	handleVariantCreate,
}) => {
	const { t: adminT } = useTranslation('admin')

	const [variantFormOpen, setVariantFormOpen] = useState(false)
	const [parent, enableAnimations] = useAutoAnimate()
	const user = useTypedSelector((state) => state.userStore.user)
	const router = useRouter()

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({
			listData: variants,
		})

	const handleCreateForm = (data: IProductVariant) => {
		handleVariantCreate(data)
		setVariantFormOpen(false)
	}

	return (
		<Card1
			sx={{
				mt: 2,
			}}
		>
			<FlexBetween
				sx={{
					pb: 2,
				}}
			>
				{!!variants.length ? (
					<>
						<H3>{adminT('productVariants')}</H3>
						<Button
							color="primary"
							variant="contained"
							size="small"
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
								<TableBody>
									{lodash.orderBy(filteredList, ['id']).map((variant) => (
										<VariantRow
											key={variant.id}
											variant={variant}
											variantFormOpen={variantFormOpen}
											enableAnimations={enableAnimations}
											handleChange={handleVariantChange}
											handleRemove={handleVariantRemove}
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
							margin="0px"
							fontSize="25px"
							fontWeight="bold"
						>
							{adminT('productVariants')}
						</Typography>
						<Typography
							color="grey.600"
							textAlign="center"
							padding="0px 20px"
							margin="0px"
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
						alignItems: 'center',
						position: 'absolute',
						top: 0,
						left: 0,
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
						}}
					>
						Доступ запрещен
					</Typography>
				</Box>
			) : null}
		</Card1>
	)
}

export default VariantList
