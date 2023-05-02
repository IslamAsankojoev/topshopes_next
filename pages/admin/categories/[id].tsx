import { Box } from '@mui/material'
import { CategoriesService } from 'src/api/services-admin/categories/category.service'
import CreateForm from 'src/components/Form/CreateForm'
import Loading from 'src/components/Loading'
import { H3 } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import useDebounce from 'src/hooks/useDebounce'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { ICategory } from 'src/shared/types/product.types'
import { categoryEditForm } from 'src/utils/constants/forms'
import { formData } from 'src/utils/formData'
import { api_admin } from 'src/api/index.service'

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
const CreateCategory: NextPageAuth = () => {
	const { t } = useTranslation('adminActions')
	const {
		push,
		query: { id },
	} = useRouter()

	//states
	const [attributeSearch, setAttributeSearch] = useState('')
	const debounceValue = useDebounce(attributeSearch)

	// category fetch
	const { data: category, isLoading } = useQuery(
		['category admin get', id],
		() => api_admin.categories.CategoriesService.get(id as string),
		{
			select: (data) => {
				return {
					...data,
					attributes: data?.attributes?.map((attr) => attr.id),
				}
			},
			enabled: !!id,
		}
	)

	const { data: attributes } = useQuery(
		`attributes get search=${debounceValue}`,
		() =>
			api_admin.attributes.AttributesServiceAdmin.getList({
				search: debounceValue,
			}),
		{
			select: (data) => data?.results,
		}
	)

	// category update
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'category admin create',
		(data: FormData) => CategoriesService.update(id as string, data),
		{
			onSuccess: () => {
				push('/admin/categories')
			},
			onError: (e: any) => {
				console.error(e.message)
			},
		}
	)

	const handleFormSubmit = async (_: any, data: ICategory) => {
		const clearData: ICategory | any = {}
		for (let key in data) {
			if (data[key]) {
				clearData[key] = data[key]
			}
		}
		const { icon, ...rest } = clearData

		await mutateAsync(formData(rest))
	}

	const setAttributes = (values) => {
		setAttributeSearch(values.attributes_search)
	}

	if (isLoading || mutationLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>{t('editCategory')}</H3>
			<CreateForm
				defaultData={category}
				fields={[
					...categoryEditForm,
					{
						name: 'attributes',
						label: 'attributes',
						type: 'checkboxes',
						placeholder: 'Enter attributes',
						allNames: attributes,
						required: true,
					},
				]}
				handleFormSubmit={handleFormSubmit}
				setAttributes={setAttributes}
			/>
		</Box>
	)
}
CreateCategory.isOnlyAdmin = true

CreateCategory.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateCategory
