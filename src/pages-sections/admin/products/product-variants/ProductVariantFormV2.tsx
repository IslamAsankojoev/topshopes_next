import { Edit } from '@mui/icons-material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import {
	Box,
	Button,
	Container,
	Dialog,
	DialogContent,
	Typography,
} from '@mui/material'
import { ProductVariantAdminService } from 'src/api/services-admin/product-variants/product-variants.service'
import { AttributesService } from 'src/api/services/attributes/attributes.service'
import { ImagesService } from 'src/api/services/images/images.service'
import { ProductVariantService } from 'src/api/services/product-variants/product-variants.service'
import CreateForm from 'src/components/Form/CreateForm'
import ProductImages from 'src/components/Gallery/ProductImages'
import { useActions } from 'src/hooks/useActions'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { useTranslation } from 'next-i18next'
import { FC, Fragment, ReactNode, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import {
	ICategory,
	IImage,
	IProductAttributeValue,
	IProductVariant,
} from 'src/shared/types/product.types'
import { productVariantFormCreate } from 'src/utils/constants/forms'
import { formData } from 'src/utils/formData'

import ProductAttributes from './productVariantAttribute'
import { CategoriesService } from 'src/api/services/categories/category.service'

// ==================================================================
type ProductVariantFormProps = {
	initialValues: IProductVariant | any
	variantId?: string | number
	productId?: string
	create?: boolean
	createPage?: boolean
	images?: IImage[]
	refetch?: () => void
	isAdmin?: boolean
	actionButtons?: ReactNode
}
// ==================================================================

const adminCheckFetch = (admin = false) => {
	if (admin) {
		return ProductVariantAdminService
	}
	return ProductVariantService
}

const ProductVariantFormV2: FC<ProductVariantFormProps> = ({
	initialValues,
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

	const { currentCategory } = useTypedSelector(
		(state) => state.productVariantsStore
	)

	const { data: attributes } = useQuery(
		'attributes get',
		() => CategoriesService.get(currentCategory),
		{
			enabled: !!currentCategory,
			select: (data: ICategory) => data.attributes,
		}
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
					value: attribute.value || '',
				})
			} else {
				await AttributesService.create(variantId as string, {
					attribute: attribute.attributeNameId,
					value: attribute.value || '',
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

	useEffect(() => {
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
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Button
						size="small"
						onClick={() =>
							addCardForm ? setAddCardForm(false) : setAddCardForm(true)
						}
					>
						<Edit />
					</Button>
					{actionButtons}
				</Box>
			)}
			<Dialog open={addCardForm} onClose={() => setAddCardForm(false)}>
				<DialogContent
					sx={{
						backgroundColor: '#F7F9FC',
						padding: '0px',
					}}
				>
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

								{/* <ProductImages
										images={imagesList}
										add={imageAdd}
										remove={imageRemove}
									/> */}
							</Fragment>
						}
					/>
				</DialogContent>
			</Dialog>
		</Fragment>
	)
}

export default ProductVariantFormV2
