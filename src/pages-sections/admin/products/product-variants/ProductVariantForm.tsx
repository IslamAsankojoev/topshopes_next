import { ModeEditOutline } from '@mui/icons-material'
import {
	Button,
	Dialog,
	DialogContent,
	IconButton,
	Typography,
} from '@mui/material'
import { ProductVariantAdminService } from 'api/services-admin/product-variants/product-variants.service'
import { ProductVariantService } from 'api/services/product-variants/product-variants.service'
import CreateForm from 'components/Form/CreateForm'
import ProductImages from 'components/Gallery/ProductImages'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import React, { FC, Fragment, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { IProductVariant } from 'shared/types/product-variant.types'
import { IColors } from 'shared/types/product.types'
import { ISize } from 'shared/types/size.types'
import { productVariantFormCreate } from 'utils/constants/forms'
import { formData } from 'utils/formData'

// ==================================================================
type ProductVariantFormProps = {
	initialValues: IProductVariant | any
	colors: IColors[]
	sizes: ISize[]
	refetch?: () => void
	productId?: string
	create?: boolean
	createPage?: boolean
}
// ==================================================================

const adminCheckFetch = (admin = false) => {
	if (admin) {
		return ProductVariantAdminService
	}
	return ProductVariantService
}

const ProductVariantForm: FC<ProductVariantFormProps> = ({
	initialValues,
	colors,
	sizes,
	refetch,
	productId,
	createPage,
	create,
}) => {
	// states
	const { user } = useTypedSelector((state) => state.userStore)
	const { variants } = useTypedSelector((state) => state.productVariantsStore)
	const [addCardForm, setAddCardForm] = useState<boolean>(false)

	// actions
	const { setVariants } = useActions()

	// mutations
	const { mutateAsync: createAsync } = useMutation(
		'product-variant create',
		(data: FormData | IProductVariant) =>
			adminCheckFetch(user?.is_superuser).create(data),
		{
			onSuccess: () => {
				refetch && refetch()
				toast.success('product variant created successfully')
				setAddCardForm(false)
			},
		}
	)
	const { mutateAsync: updateAsync } = useMutation(
		'product-variant update',
		(data: FormData | IProductVariant) =>
			adminCheckFetch(user?.is_superuser).update(
				initialValues.id as unknown as string,
				data
			),
		{
			onSuccess: () => {
				refetch && refetch()
				toast.success('product variant updated successfully')
				setAddCardForm(false)
			},
		}
	)

	// fetch
	const handleFormSubmit = async (
		data: FormData,
		clearData: IProductVariant | any
	) => {
		// if there is already a product
		if (productId) {
			await createAsync(
				formData({ ...clearData, product: productId as string })
			)
			setAddCardForm(false)
			return
		}
		// if there is no product yet
		if (create && createPage) {
			// create variant
			setVariants([...variants, { variants: clearData, images: [] }])
			setAddCardForm(false)
			return
		}

		if (createPage) {
			// update variant
			setVariants(
				variants.map((variant) => {
					if (
						JSON.stringify(variant.variants) == JSON.stringify(initialValues)
					) {
						return {
							variants: { ...clearData, product: productId },
							images: [],
						}
					}
					return variant
				})
			)
			setAddCardForm(false)
			return
		}
		await updateAsync(data)
	}

	return (
		<Fragment>
			{create ? (
				<Button
					color="primary"
					variant="outlined"
					sx={{ p: '2px 20px' }}
					onClick={() =>
						addCardForm ? setAddCardForm(false) : setAddCardForm(true)
					}
				>
					Add New Variant
				</Button>
			) : (
				<IconButton
					size="small"
					sx={{ mr: 1 }}
					onClick={() =>
						addCardForm ? setAddCardForm(false) : setAddCardForm(true)
					}
				>
					<ModeEditOutline sx={{ fontSize: 20 }} />
				</IconButton>
			)}

			<Dialog open={addCardForm} onClose={() => setAddCardForm(false)}>
				<DialogContent>
					<Typography variant="h6" mb={3}>
						Add New Address Information
					</Typography>

					<CreateForm
						defaultData={{
							...initialValues,
							color: createPage
								? initialValues?.color
								: initialValues?.color?.id,
							size: createPage ? initialValues?.size : initialValues?.size?.id,
						}}
						fields={[
							{
								name: 'size',
								label: 'size',
								type: 'select',
								allNames: sizes,
								placeholder: 'Enter discount',
								required: true,
							},
							{
								name: 'color',
								label: 'color',
								type: 'select',
								allNames: colors,
								placeholder: 'Enter colors',
								required: true,
							},
							...productVariantFormCreate,
						]}
						handleFormSubmit={handleFormSubmit}
					/>
				</DialogContent>
			</Dialog>
		</Fragment>
	)
}

export default ProductVariantForm
