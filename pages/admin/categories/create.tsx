import { Box } from '@mui/material'
import { AttributesServiceAdmin } from 'src/api/services-admin/attributes/attributes.service'
import { CategoriesService } from 'src/api/services-admin/categories/category.service'
import CreateForm from 'src/components/Form/CreateForm'
import Loading from 'src/components/Loading'
import { H3 } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import useDebounce from 'src/hooks/useDebounce'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { ICategory } from 'src/shared/types/product.types'
import { categoryEditForm } from 'src/utils/constants/forms'
import { formData } from 'src/utils/formData'

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

const CreateCategory: NextPageAuth = () => {
	const { t } = useTranslation('adminActions')
	const { push } = useRouter()

	//states
	const [attributeSearch, setAttributeSearch] = useState('')
	const debounceValue = useDebounce(attributeSearch)

	// category create
	const { isLoading, mutateAsync } = useMutation(
		'category admin create',
		(data: FormData) => CategoriesService.create(data),
		{
			onSuccess: () => {
				push('/admin/categories')
			},
			onError: (e: any) => {
				console.error(e.message)
			},
		}
	)

	const { data: attributes } = useQuery(
		`attributes get search=${debounceValue}`,
		() => AttributesServiceAdmin.getList({ search: debounceValue }),
		{ select: (data) => data?.results }
	)

	const handleFormSubmit = async (_: any, data: ICategory) => {
		const clearData: ICategory | any = {}
		for (let key in data) {
			if (data[key]) {
				clearData[key] = data[key]
			}
		}

		await mutateAsync(
			formData({
				...clearData,
				tax: clearData?.tax ? clearData.tax : 0,
			})
		)
	}

	const setAttributes = (values) => {
		setAttributeSearch(values.attributes_search)
	}

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>{t('addNewCategory')}</H3>
			<CreateForm
				defaultData={{ tax: 0, attributes: [] }}
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
