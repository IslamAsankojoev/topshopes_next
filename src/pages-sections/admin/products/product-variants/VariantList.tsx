import {
	Box,
	Button,
	Card,
	Table,
	TableBody,
	TableContainer,
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
import { dynamicLocalization } from 'src/utils/Translate/dynamicLocalization'

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
	// const { t: commonT } = useTranslation('common')
	const [variantFormOpen, setVariantFormOpen] = useState(false)
	const [parent, enableAnimations] = useAutoAnimate()

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
			<FlexBetween>
				<h2>{adminT('productVariants')}</h2>
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
					{dynamicLocalization({
						ru: 'Добавить вариант',
						tr: 'Varyant Ekle',
						en: 'Add Variant',
						kg: 'Вариант кошуруу',
						kz: 'Вариант қосу',
					})}
				</Button>
			</FlexBetween>

			<VariantForm
				handleFormSubmit={handleCreateForm}
				open={variantFormOpen}
				setOpen={setVariantFormOpen}
			/>

			{!!variants.length ? (
				<Card>
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
				<Empty />
			)}
		</Card1>
	)
}

export default VariantList
