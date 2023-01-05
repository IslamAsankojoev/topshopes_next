import { Box } from '@mui/material'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'
import { IBrandTypes } from 'shared/types/brand-types.types'
import { brandTypeEditForm } from 'utils/constants/forms'
import { BrandTypesService } from '../../../src/api/services-admin/brand-types/brandTypes.service'

const CreateBrandType: NextPageAuth = () => {
	const {
		push,
		query: { id },
	} = useRouter()

	// brand type fetch
	const { data: brandType, isLoading } = useQuery(
		'get brandType one',
		() => BrandTypesService.get(id as string),
		{
			enabled: !!id,
		}
	)

	// brand type update
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'brandTypes admin update',
		(data: IBrandTypes) => BrandTypesService.update(id as string, data),
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

	if (isLoading || mutationLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Update Brand Type</H3>
			<CreateForm
				defaultData={brandType}
				fields={brandTypeEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}

CreateBrandType.isOnlyUser = true

CreateBrandType.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateBrandType
