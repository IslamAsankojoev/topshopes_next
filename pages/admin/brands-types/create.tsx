import { Box } from '@mui/material'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { brandTypeEditForm } from '../../../src/utils/constants/forms'
import { BrandTypesService } from '../../../src/api/services-admin/brand-types/brandTypes.service'
import { useMutation } from 'react-query'
import { IBrandTypes } from 'shared/types/brand-types.types'
import { toast } from 'react-toastify'
import Loading from 'components/Loading'
import { NextPageAuth } from 'shared/types/auth.types'

const CreateBrandTypes: NextPageAuth = () => {
	const { push } = useRouter()

	// brand type create
	const { isLoading, mutateAsync } = useMutation(
		'brandTypes admin create',
		(data: IBrandTypes) => BrandTypesService.create(data),
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

	const handleFormSubmit = async (data: IBrandTypes) => {
		await mutateAsync(data)
	}

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Add New Brand Type</H3>
			<CreateForm
				defaultData={{}}
				fields={brandTypeEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}
CreateBrandTypes.isOnlyUser = true

CreateBrandTypes.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateBrandTypes
