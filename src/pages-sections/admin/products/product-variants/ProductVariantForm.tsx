import { Close, Edit, ModeEditOutline } from '@mui/icons-material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import {
	Box,
	Button,
	Container,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	Typography,
} from '@mui/material'
import { ProductVariantAdminService } from 'api/services-admin/product-variants/product-variants.service'
import { AttributesService } from 'api/services/attributes/attributes.service'
import { ImagesService } from 'api/services/images/images.service'
import { ProductVariantService } from 'api/services/product-variants/product-variants.service'
import CreateForm from 'components/Form/CreateForm'
import ProductImages from 'components/Gallery/ProductImages'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useTranslation } from 'next-i18next'
import React, { FC, Fragment, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import {
	IColor,
	IImage,
	IProductAttributeValue,
	IProductVariant,
	ISize,
} from 'shared/types/product.types'
import { productVariantFormCreate } from 'utils/constants/forms'
import { formData } from 'utils/formData'

import ProductAttributes from './productVariantAttribute'

// ==================================================================
type ProductVariantFormProps = {
	initialValues: IProductVariant | any
	attributes: IProductAttributeValue[]
	variantId?: string | number
	productId?: string
	create?: boolean
	createPage?: boolean
	images?: IImage[]
	refetch?: () => void
	isAdmin?: boolean
	actionButtons?: React.ReactNode
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
	attributes,
	refetch,
	productId,
	createPage,
	create,
	variantId,
	images,
	isAdmin,
	actionButtons,
}) => {
	const { t: commonT } = useTranslation('common')
	const { t: adminT } = useTranslation('admin')
	// states
	const { user } = useTypedSelector((state) => state.userStore)
	const { imgIdCounter, newAttributes } = useTypedSelector(
		(state) => state.productVariantsStore
	)
	const [addCardForm, setAddCardForm] = useState<boolean>(false)
	const [imagesList, setImagesList] = useState<any[]>(images || [])

	// actions
	const { updateVariant, addVariant, imgIdCounterIncrement, setNewAttributes } =
		useActions()

	// variant mutations
	const { mutateAsync: updateAsync } = useMutation(
		'product-variant update',
		(data: FormData | IProductVariant) =>
			adminCheckFetch(user?.is_superuser).update(
				initialValues.id as unknown as string,
				data
			),
		{
			onSuccess: async () => {
				refetch && (await refetch())
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
		// если еще нет продукта
		if (create && createPage) {
			// create variant
			addVariant({
				variant: clearData,
				images: imagesList,
				attribute_values: newAttributes,
			})

			setImagesList([])
			setAddCardForm(false)
			setNewAttributes([])
			return
		}
		if (createPage) {
			// update variant
			updateVariant({
				id: variantId,
				data: { variant: clearData, images: imagesList },
			})
			setImagesList([])
			setAddCardForm(false)
			return
		}

		// если уже есть продукт
		if (productId) {
			// create variant
			const variantResponse = await adminCheckFetch(user?.is_superuser).create(
				formData({
					...clearData,
					product: productId as string,
				})
			)
			// создаем изображения после создания варианта
			for (let img of imagesList) {
				await ImagesService.create(
					formData({
						product_variant: variantResponse.id,
						image: img.image,
					})
				)
			}

			for (let attribute of newAttributes) {
				if (!attribute.value) continue
				await AttributesService.create(variantResponse.id, {
					attribute: attribute.attributeNameId,
					value: attribute.value,
				})
			}

			setNewAttributes([])
			setImagesList([])
			setAddCardForm(false)
			refetch && (await refetch())
			return
		}

		// update variant
		await updateAsync(data)
		for (let attribute of newAttributes) {
			if (!attribute) continue

			if (attribute?.available) {
				await AttributesService.update(attribute.attributeId as string, {
					product_variant: variantId,
					attribute: attribute.attributeId,
					value: attribute.value || 'without',
				})
			} else {
				await AttributesService.create(variantId as string, {
					attribute: attribute.attributeNameId,
					value: attribute.value || 'without',
				})
			}
		}
		setImagesList([])
		setNewAttributes([])
		refetch && (await refetch())
	}

	const imageAdd = async (image: IImage | File) => {
		if (create || createPage) {
			imgIdCounterIncrement()
			setImagesList((imgs) => [
				...imgs,
				{ image, id: imgs.length + imgIdCounter },
			])
			return
		}

		// если уже есть вариант сразу отправляем запрос
		await ImagesService.create(
			formData({
				image,
				product_variant: variantId,
			})
		)
		refetch && (await refetch())
	}

	const imageRemove = async (image: IImage) => {
		if (!create && !createPage) {
			// если уже есть изображение сразу отправляем запрос
			await ImagesService.delete(image.id as string)
			refetch && (await refetch())
		}
		const imgs = []
		for (let img of imagesList) {
			if (img.id === image.id) continue
			imgs.push(img)
		}
		setImagesList(imgs)
	}

	React.useEffect(() => {
		setImagesList(images || [])
	}, [images])

	return (
		<Fragment>
			{create ? (
				<Button
					color="success"
					variant="contained"
					sx={{ p: '7px 12px' }}
					onClick={() =>
						addCardForm ? setAddCardForm(false) : setAddCardForm(true)
					}
					disabled={isAdmin}
					startIcon={<LibraryAddIcon />}
				>
					{adminT('addVariant')}
				</Button>
			) : (
				<Box
					gap={1}
					sx={{
						display: 'grid',

						justifyContent: 'space-between',
						flexDirection: 'column',
						alignItems: 'center',
						position: 'absolute',
						top: '10px',
						right: '10px',
					}}
				>
					{actionButtons}
					<Button
						size="small"
						variant="contained"
						color="secondary"
						onClick={() =>
							addCardForm ? setAddCardForm(false) : setAddCardForm(true)
						}
					>
						<Edit />
					</Button>
				</Box>
			)}

			<Dialog
				open={addCardForm}
				fullScreen
				onClose={() => setAddCardForm(false)}
			>
				<DialogContent
					sx={{
						backgroundColor: '#F7F9FC',
					}}
				>
					<Container>
						<Typography variant="h6" mb={3} textAlign="center">
							{adminT('variantDetails')}
						</Typography>

						<CreateForm
							defaultData={initialValues}
							fields={productVariantFormCreate}
							handleFormSubmit={handleFormSubmit}
							actionButtons={
								<Fragment>
									<Button
										onClick={() => setAddCardForm(false)}
										variant="contained"
										color="error"
										size="small"
									>
										{adminT('cancel')}
									</Button>
								</Fragment>
							}
							children={
								<Fragment>
									<ProductAttributes
										variantId={variantId}
										attributes={attributes}
										handleFormSubmit={() => null}
									/>

									<ProductImages
										images={imagesList}
										add={imageAdd}
										remove={imageRemove}
									/>
								</Fragment>
							}
						/>
					</Container>
				</DialogContent>
			</Dialog>
		</Fragment>
	)
}

export default ProductVariantForm
