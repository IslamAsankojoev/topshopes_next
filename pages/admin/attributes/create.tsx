import { Box } from '@mui/material'
import CreateForm from 'src/components/Form/CreateForm'
import Loading from 'src/components/Loading'
import { H3 } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { IProductAttribute } from 'src/shared/types/product.types'
import { attributeEditForm } from 'src/utils/constants/forms'
import { api_admin } from 'src/api/index.service'

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

const CreateAttribute: NextPageAuth = () => {
	const { t } = useTranslation('adminActions')
	const { push } = useRouter()

	// attributes type create
	const { isLoading, mutateAsync } = useMutation(
		'attributes admin create',
		(data: IProductAttribute) =>
			api_admin.attributes.AttributesServiceAdmin.create(data),
		{
			onSuccess: () => {
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

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>{t('addNewAttribute')}</H3>
			<CreateForm
				defaultData={{}}
				fields={attributeEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}
CreateAttribute.isOnlyAdmin = true

CreateAttribute.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateAttribute
