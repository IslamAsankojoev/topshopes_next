import { Box } from '@mui/material'
import { AttributesServiceAdmin } from 'src/api/services-admin/attributes/attributes.service'
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
import { IProductAttribute } from 'src/shared/types/product.types'
import { brandTypeEditForm } from 'src/utils/constants/forms'

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
	const { data: attribute, isLoading } = useQuery(
		['get attribute', id],
		() => AttributesServiceAdmin.get(id as string),
		{
			enabled: !!id,
		}
	)

	// brand type update
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'attribute admin update',
		(data: IProductAttribute) =>
			AttributesServiceAdmin.update(id as string, data),
		{
			onSuccess: () => {
				toast.success('success')
				push('/admin/attributes')
			},
			onError: (e: any) => {
				toast.error(e.message)
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
			<CreateForm
				defaultData={attribute}
				fields={brandTypeEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}

UpdateAttribute.isOnlyAdmin = true

UpdateAttribute.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default UpdateAttribute
