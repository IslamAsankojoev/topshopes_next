import { Box, Button } from '@mui/material'
import useId from '@mui/material/utils/useId'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { toast } from 'react-toastify'
import { AttributesService } from 'src/api/services/attributes/attributes.service'
import { ProductVariantService } from 'src/api/services/product-variants/product-variants.service'
import { ProductsService } from 'src/api/services/products/product.service'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { H3 } from 'src/components/Typography'
import { productFormValidationSchemaVendor } from 'src/components/validationSchema'
import { useActions } from 'src/hooks/useActions'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { ProductForm } from 'src/pages-sections/admin'
import VariantList from 'src/pages-sections/admin/products/product-variants/VariantList'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { IProductVariant } from 'src/shared/types/product.types'
import { formData } from 'src/utils/formData'
import { getErrorMessage } from 'src/utils/getErrorMessage'
import { localize } from 'src/utils/Translate/localize'
import { v4 } from 'uuid'

const initialValues = {
	title: '',
	published: false,
	category: '',
	brand: '',
	unit: '',
}

const CreateProductV2: NextPageAuth = () => {
	const localVariants = useTypedSelector((state) => state.localVariantsStore)
	const variants: IProductVariant[] = Object.values(localVariants)
	const { push } = useRouter()
	const { localVariantAdd, localVariantRemove, localeVariantsClear } =
		useActions()

	const handleFormSubmit = async (data: FormData) => {
		if (variants.length === 0) {
			toast.error(
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

		try {
			// create product
			const productResponse = await ProductsService.create(data) // create product
			const productId = productResponse.id // get product id

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
				const variantResponse = await ProductVariantService.create(variantData) // create variant

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
						await AttributesService.create(variantResponse.id as string, {
							attribute: attribute.attribute.id,
							value: attribute.value,
						})
					}
				) // create attributes
				await Promise.all(attributePromises) // wait for all attributes to be created
			})
			await Promise.all(variantPromises) // wait for all variants to be created
			localeVariantsClear() // clear local variants
			push(`/vendor/products-v2/`) // redirect to products list
		} catch (e) {
			console.error(e)
			toast.error('Продукт не был создан: ' + getErrorMessage(e))
		}
	}

	const handleChangeVariant = (data: IProductVariant) => {
		data?.id && localVariantRemove(data.id)
		localVariantAdd(data)
	}

	const handleRemoveVariant = (id: string) => {
		localVariantRemove(id)
	}

	const handleCreateVariant = (data: IProductVariant) => {
		localVariantAdd(data)
	}

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
			/>
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
