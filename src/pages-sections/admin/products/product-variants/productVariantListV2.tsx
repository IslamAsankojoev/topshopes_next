import styled from '@emotion/styled'
import { Close } from '@mui/icons-material'
import { Button, Card, Table, TableBody, TableContainer } from '@mui/material'
import { CategoriesService } from 'src/api/services/categories/category.service'
import Card1 from 'src/components/Card1'
import { FlexBetween } from 'src/components/flex-box'
import { useActions } from 'src/hooks/useActions'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { useTranslation } from 'next-i18next'
import { FC, Fragment, useEffect } from 'react'
import { useQuery } from 'react-query'
import { IProductVariant } from 'src/shared/types/product.types'
import { IProduct } from 'src/shared/types/product.types'

import { adminCheckFetch } from './productVariantHelper'
import ProductVariantFormV2 from './ProductVariantFormV2'
import Scrollbar from 'src/components/Scrollbar'
import TableHeader from 'src/components/data-table/TableHeader'
import useMuiTable from 'src/hooks/useMuiTable'
import ProductVariantRowV2 from './ProductVariantRowV2'
import Empty from 'src/components/Empty'

type Props = {
	refetch?: () => void
	product: IProduct | { variants: IProductVariant[] }[] | any
	create?: boolean
	isAdmin?: boolean
}

const tableHeading = [
	{ id: 'image', label: 'image', align: 'left' },
	{ id: 'price', label: 'price', align: 'left' },
	{ id: 'sale', label: 'sale', align: 'left' },
	{ id: 'status', label: 'status', align: 'left' },
	{ id: 'stock', label: 'stock', align: 'left' },
	{ id: 'attributes', label: 'attributes', align: 'left' },
	{ id: 'action', label: 'action', align: 'center' },
]

const ProductVariantListV2: FC<Props> = ({
	refetch,
	product,
	create,
	isAdmin,
}) => {
	const { t: adminT } = useTranslation('admin')
	const { t: commonT } = useTranslation('common')

	// actions
	const { removeVariant } = useActions()

	// states
	const { user } = useTypedSelector((state) => state.userStore)
	const { currentCategory } = useTypedSelector(
		(state) => state.productVariantsStore
	)

	// functions
	const variantCheck = (data) => (create ? data?.variant : data)
	const variantList = (data) => (create ? data : data?.variants)

	const getAllattributes = (
		variantAttributes: any,
		categoryAttributes: any
	) => {
		if (variantAttributes?.length === categoryAttributes?.length) {
			return variantAttributes
		}

		return categoryAttributes?.map((attribute) => {
			if (!variantAttributes?.length) {
				return attribute
			}
			for (let i of variantAttributes) {
				if (
					i?.attribute?.name === attribute?.name ||
					i?.attributeName === attribute?.name
				) {
					return i
				}
			}
			return attribute
		})
	}

	const deleteVariant = async (item: IProductVariant) => {
		if (create) {
			removeVariant(item.id)
			return
		}
		await adminCheckFetch(user.is_superuser).delete(item?.id)
		refetch && (await refetch())
	}

	// fetching
	const { data: category, refetch: categoryRefetch } = useQuery(
		'category get',
		() => CategoriesService.get(currentCategory),
		{
			enabled: !!currentCategory,
		}
	)

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: product.variants })

	useEffect(() => {
		if (currentCategory) categoryRefetch()
	}, [currentCategory])

	return (
		<Card1 sx={{ mb: 3, mt: 3 }}>
			<FlexBetween>
				<h2>{adminT('productVariants')}</h2>
				<ProductVariantFormV2
					attributes={category?.attributes}
					refetch={refetch}
					initialValues={{}}
					productId={product?.id}
					createPage={create}
					create={true}
					isAdmin={isAdmin}
				/>
			</FlexBetween>

			{product.variants?.length > 0 ? (
				<Card>
					<Scrollbar>
						<TableContainer sx={{ minWidth: 900 }}>
							<Table>
								<TableHeader
									order={order}
									hideSelectBtn
									orderBy={orderBy}
									heading={tableHeading}
									rowCount={variantList.length}
									numSelected={selected?.length}
									onRequestSort={handleRequestSort}
								/>

								<TableBody>
									{filteredList?.map((variant, index) => (
										<ProductVariantRowV2
											refetch={refetch}
											variant={variant}
											key={index}
											dialogForm={
												<ProductVariantFormV2
													attributes={getAllattributes(
														variant.attribute_values,
														category?.attributes
													)}
													refetch={refetch}
													initialValues={variantCheck(variant)}
													createPage={create}
													variantId={variant?.id}
													images={variant?.images}
													actionButtons={
														<Fragment>
															{!isAdmin ? (
																<Button
																	size="small"
																	color="error"
																	onClick={(e) => deleteVariant(variant)}
																>
																	<Close />
																</Button>
															) : null}
														</Fragment>
													}
												/>
											}
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

const VariantCard = styled(Card)`
	display: grid !important;
	flexdirection: row !important;
	grid-gap: 20px 0 !important;
	padding: 20px 10px !important;
	box-shadow: 0px 1px 3px rgb(3 0 71 / 30%) !important;
	border: none !important;
	position: relative !important;

	img {
		margin: 0 auto;
		max-width: 300px;
		height: 250px;
		width: 100%;
		object-fit: cover;
	}
`

export default ProductVariantListV2
