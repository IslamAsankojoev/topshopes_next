import { Box } from '@mui/material'
import CreateForm from 'components/Form/CreateForm'
import Loading from 'components/Loading'
import { H3 } from 'components/Typography'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'
import { IBrandTypes } from 'shared/types/brand-types.types'

import { BrandTypesService } from '../../../src/api/services-admin/brand-types/brandTypes.service'
import { brandTypeEditForm } from '../../../src/utils/constants/forms'

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

const CreateBrandTypes: NextPageAuth = () => {
	const { t } = useTranslation('adminActions')

	const { push } = useRouter()

	// brand type create
	const { isLoading, mutateAsync } = useMutation(
		'brandTypes admin create',
		(data: FormData) => BrandTypesService.create(data),
		{
			onSuccess: () => {
				toast.success('success')
				push('/admin/brands-types')
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const handleFormSubmit = async (data: FormData) => {
		await mutateAsync(data)
	}

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>{t('addNewBrandType')}</H3>
			<CreateForm
				defaultData={{}}
				fields={brandTypeEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}
CreateBrandTypes.isOnlyAuth = true

CreateBrandTypes.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateBrandTypes
