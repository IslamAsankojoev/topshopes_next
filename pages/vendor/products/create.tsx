import { Box } from '@mui/material'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from 'src/api/index.service'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import Loading from 'src/components/Loading'
import { H3 } from 'src/components/Typography'
import { useActions } from 'src/hooks/useActions'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { ProductForm } from 'src/pages-sections/admin'
import VariantList from 'src/pages-sections/admin/products/product-variants/VariantList'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { IProductVariant } from 'src/shared/types/product.types'
import { formData } from 'src/utils/formData'
import { localize } from 'src/utils/Translate/localize'
import { v4 } from 'uuid'

const initialValues = {
	title: '',
	is_published: true,
	category: '',
	brand: '',
	unit: 'шт',
}

const CreateProductV2: NextPageAuth = () => {
	const localVariants = useTypedSelector((state) => state.localVariantsStore)
	const variants: IProductVariant[] = Object.values(localVariants)
	const [productID, setProductID] = useState<string | null>(null)
	const [cloneLoading, setCloneLoading] = useState<null | string>(null)

	const [createLoading, setCreateLoading] = useState(false)
	const { push } = useRouter()
	const { localVariantAdd, localVariantRemove, localeVariantsClear } =
		useActions()

	const handleFormSubmit = async (data: FormData) => {
		if (variants.length === 0) {
			toast.warning(
				localize({
					ru: 'Добавьте варианты товара',
					tr: 'Ürün varyantlarını ekleyin',
					en: 'Add product variants',
					kg: 'Төрлүктөрдү кошуңуз',
					kz: 'Төрліктерді қосыңыз',
				})
			)
			return null
		}
		setCreateLoading(true)

		try {
			// create product
			const productResponse = await api.products.ProductsService.create(data) // create product
			const productId = productResponse.id // get product id
			setProductID(productId) // set product id

			// create variants with new product
			const variantPromises = variants.map(async (variant) => {
				const variantData = formData({
					product: productId,
					price: variant.price,
					discount: variant.discount,
					thumbnail: variant.thumbnail,
					stock: variant.stock,
					status: variant.status,
				}) // create variant data
				const variantResponse = await api.variants.ProductVariantService.create(
					variantData
				) // create variant

				// const imagePromises = variant?.images.map(async (image) => {
				// 	const imageData = formData({
				// 		product_variant: variantResponse.id,
				// 		image: image.image,
				// 	})
				// 	await ImagesService.create(imageData)
				// })
				// await Promise.all(imagePromises)

				const attributePromises = variant?.attribute_values.map(
					async (attribute) => {
						if (!attribute.value) return null
						await api.attributes.AttributesService.create(
							variantResponse.id as string,
							{
								attribute: attribute.attribute.id,
								value: attribute.value,
							}
						)
					}
				) // create attributes
				await Promise.all(attributePromises) // wait for all attributes to be created
			})
			await Promise.all(variantPromises) // wait for all variants to be created
			localeVariantsClear() // clear local variants
			push(`/vendor/products/`) // redirect to products list
			setCreateLoading(false)
		} catch (e) {
			api.products.ProductsService.delete(productID as string)
			console.error(e)
			toast.error(
				localize({
					ru: 'Ошибка при создании продукта',
					tr: 'Ürün oluşturulurken hata oluştu',
					en: 'Error creating product',
				})
			)
			setCreateLoading(false)
		}
	}

	const handleUpOrdering = async (
		variant: IProductVariant,
		prevVariant: IProductVariant
	) => {
		localVariantRemove(variant?.id)
		localVariantAdd({
			...variant,
			ordering: prevVariant.ordering,
		})
		localVariantRemove(prevVariant?.id)
		localVariantAdd({
			...prevVariant,
			ordering: variant.ordering,
		})
	}

	const handleDownOrdering = async (
		variant: IProductVariant,
		nextVariant: IProductVariant
	) => {
		localVariantRemove(variant?.id)
		localVariantAdd({
			...variant,
			ordering: nextVariant.ordering,
		})
		localVariantRemove(nextVariant?.id)
		localVariantAdd({
			...nextVariant,
			ordering: variant.ordering,
		})
	}

	const handleChangeVariant = (data: IProductVariant) => {
		localVariantRemove(data?.id)
		localVariantAdd(data)
	}

	const handleRemoveVariant = (id: string) => {
		localVariantRemove(id)
	}

	const handleCreateVariant = (data: IProductVariant) => {
		localVariantAdd(data)
	}

	const handleCloneVariant = (data: IProductVariant) => {
		setCloneLoading(data.id)
		const audioClone = new Audio('/clone.mp3')
		console.log(variants.length + 1)
		localVariantAdd({
			...data,
			id: v4(),
			ordering: variants?.length + 1,
		})
		setCloneLoading(null)
		audioClone.play()
	}
	useEffect(() => {
		console.log(variants)
	}, [variants])

	return fetch ? (
		<Box py={4}>
			<H3 mb={2}>Добавить новый продукт</H3>
			<ProductForm
				initialValues={initialValues}
				handleFormSubmit={handleFormSubmit}
				update={false}
			/>
			<br />
			<VariantList
				variants={variants}
				handleVariantChange={handleChangeVariant}
				handleVariantRemove={handleRemoveVariant}
				handleVariantCreate={handleCreateVariant}
				handleVariantClone={handleCloneVariant}
				cloneLoading={cloneLoading}
				handleUpOrdering={handleUpOrdering}
				handleDownOrdering={handleDownOrdering}
			/>
			{createLoading ? <Loading /> : null}
		</Box>
	) : null
}

CreateProductV2.isOnlySeller = true

CreateProductV2.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateProductV2

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				'common',
				'admin',
				'adminActions',
			])),
		},
	}
}
