import { Box } from '@mui/material'
import CreateForm from 'src/components/Form/CreateForm'
import Loading from 'src/components/Loading'
import { H3 } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { IAttribute, IProductAttribute } from 'src/shared/types/product.types'
import { brandTypeEditForm } from 'src/utils/constants/forms'
import isEmpty from 'lodash-es/isEmpty'
import { localize } from 'src/utils/Translate/localize'
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

const UpdateAttribute: NextPageAuth = () => {
	const { t } = useTranslation('adminActions')

	const {
		push,
		query: { id },
	} = useRouter()

	// brand type fetch
	const {
		data: attribute,
		isLoading,
		refetch,
	} = useQuery(
		['get attribute', id],
		() => api_admin.attributes.AttributesServiceAdmin.get(id as string),
		{
			cacheTime: 0,
			enabled: !!id,
			select: (data: IAttribute) => data,
		}
	)

	// brand type update
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'attribute admin update',
		(data: IProductAttribute) =>
			api_admin.attributes.AttributesServiceAdmin.update(id as string, data),
		{
			onSuccess: () => {
				toast.success(
					localize({
						ru: 'Обновлен',
						tr: 'Güncellendi',
						en: 'Updated',
					})
				)
				push('/admin/attributes')
			},
			onError: (e: any) => {
				console.error(e.message)
			},
		}
	)

	const handleFormSubmit = async (_: any, data: IProductAttribute) => {
		await mutateAsync(data)
	}

	if (isLoading || mutationLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>{t('editAttribute')}</H3>
			{!isEmpty(attribute) && (
				<CreateForm
					defaultData={attribute}
					fields={brandTypeEditForm}
					handleFormSubmit={handleFormSubmit}
				/>
			)}
		</Box>
	)
}

UpdateAttribute.isOnlyAdmin = true

UpdateAttribute.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default UpdateAttribute
