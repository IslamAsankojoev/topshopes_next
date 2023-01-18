import { ModeEditOutline } from '@mui/icons-material'
import {
	Button,
	Dialog,
	DialogContent,
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
}) => {
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
					value: attribute.value,
				})
			}
		}

		setNewAttributes([])
		refetch && (await refetch())
	}

	const imageAdd = async (image: IImage | File) => {
		if (create || createPage) {
			console.log(imgIdCounter)
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
					color="primary"
					variant="outlined"
					sx={{ p: '2px 20px' }}
					onClick={() =>
						addCardForm ? setAddCardForm(false) : setAddCardForm(true)
					}
					disabled={isAdmin}
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
						Variant details
					</Typography>

					<CreateForm
						defaultData={initialValues}
						fields={productVariantFormCreate}
						handleFormSubmit={handleFormSubmit}
					/>

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
				</DialogContent>
			</Dialog>
		</Fragment>
	)
}

export default ProductVariantForm
