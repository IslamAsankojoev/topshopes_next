import { Box } from '@mui/material'
import { ProductsService } from 'src/api/services/products/product.service'
import { H3 } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ProductForm } from 'src/pages-sections/admin'
import { ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'src/shared/types/auth.types'
import {
	IProduct,
	IProductAttributeValue,
	IProductVariant,
} from 'src/shared/types/product.types'
import VariantList from 'src/pages-sections/admin/products/product-variants/VariantList'
import { ProductVariantService } from 'src/api/services/product-variants/product-variants.service'
import { dataWithCleanImage, formData } from 'src/utils/formData'
import { AttributesService } from 'src/api/services/attributes/attributes.service'
import { localize } from 'src/utils/Translate/localize'
import { filter as _filter, includes as _includes } from 'lodash'
import getRefererPath from 'src/utils/getRefererPath'

export const getServerSideProps = async ({ locale }) => {
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

const EditProduct: NextPageAuth = () => {
	const { t } = useTranslation('adminActions')
	const {
		push,
		query: { id },
	} = useRouter()
	const [variantsBlackList, setVariantsBlackList] = useState<string[]>([])

	const {
		data: product,
		isError,
		refetch,
	} = useQuery(
		['product get v2', id],
		() => ProductsService.get(id as string),
		{
			enabled: !!id,
			keepPreviousData: true,
			onError: (e: any) => toast.error(e.message, { autoClose: 5000 }),
		}
	) // product query

	// product mutation
	const { mutateAsync } = useMutation(
		'product update v2',
		(data: IProduct) => ProductsService.update(id as string, data),
		{
			onSuccess: async () => {
				toast.success('updated')
				refetch()
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	) // product mutation

	const filteredVariantsList = _filter(
		product?.variants,
		(item) => !_includes(variantsBlackList, item.id)
	) // filter variants list

	const handleFormSubmit = async (data: IProduct, redirect: boolean) => {
		if (filteredVariantsList?.length === 0) {
			// check if variants list is empty
			toast.error(
				localize({
					ru: 'Добавьте варианты товара',
					tr: 'Ürün varyantlarını ekleyin',
					en: 'Add product variants',
					kg: 'Төрлүктөрдү кошуңуз',
					kz: 'Төрліктерді қосыңыз',
				})
			) // show error toast
			return null
		}
		await mutateAsync(data) // update product

		const variantsPromises = variantsBlackList.map((id) => {
			return ProductVariantService.delete(id) // delete each variant
		})

		await Promise.all(variantsPromises) // wait for all promises to resolve
		push(getRefererPath() || '/vendor/products-v2/') // redirect to products list
	}

	const handleVariantChange = async (data: IProductVariant) => {
		try {
			await ProductVariantService.update(
				data.id,
				formData({
					...dataWithCleanImage(data, 'thumbnail'),
				})
			) // update variant

			const attributePromises = data?.attribute_values.map(
				async (attrValue: IProductAttributeValue) => {
					// if (!attrValue.value) return null
					if (attrValue.id) {
						await AttributesService.update(attrValue.id.toString(), {
							product_variant: data.id,
							value: attrValue.value || '',
						})
						return null
					}

					await AttributesService.create(data.id, {
						attribute: attrValue.attribute.id,
						value: attrValue.value || '',
					})
				}
			) // update each attribute

			await Promise.all(attributePromises)
			refetch()
		} catch (error) {
			console.error('Failed to update variant:', error)
		}
	}

	const handleVariantRemove = async (id: string) => {
		setVariantsBlackList((prev) => [...prev, id])
		// refetch()
	}

	const handleVariantCreate = async (data: IProductVariant) => {
		const createdVariant: IProductVariant = await ProductVariantService.create(
			formData({
				...data,
				product: id as string,
			})
		)
		const attributePromises = data?.attribute_values.map(async (attribute) => {
			if (!attribute.value) return null
			await AttributesService.create(createdVariant.id as string, {
				attribute: attribute.attribute.id,
				value: attribute.value || '',
			})
		})
		await Promise.all(attributePromises)
		refetch()
	}

	return !isError && fetch ? (
		<Box py={4}>
			<H3 mb={2}>{t('editProduct')}</H3>
			{product ? (
				<>
					<ProductForm
						initialValues={product}
						handleFormSubmit={handleFormSubmit}
						update={true}
						refetch={refetch}
					/>

					{/* <ProductVariantListV2
						refetch={refetch}
						product={product}
						isAdmin={false}
					/> */}
					<VariantList
						variants={filteredVariantsList}
						handleVariantChange={handleVariantChange}
						handleVariantRemove={handleVariantRemove}
						handleVariantCreate={handleVariantCreate}
					/>
				</>
			) : null}
		</Box>
	) : null
}
EditProduct.isOnlySeller = true

EditProduct.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default EditProduct
