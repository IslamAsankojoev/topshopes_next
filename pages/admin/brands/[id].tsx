import { Box } from '@mui/material'
import { BrandsService } from 'api/services-admin/brands/brand.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'
import { IBrand } from 'shared/types/brand.types'
import { brandEditForm } from 'utils/constants/forms'

const BrandUpdate: NextPageAuth = () => {
	const {
		push,
		query: { id },
	} = useRouter()

	// brand fetch
	const { data: brand, isLoading } = useQuery(
		'brand admin get',
		() => BrandsService.getBrand(id as string),
		{ enabled: !!id }
	)

	// brand update
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'brand admin update',
		(data: IBrand) => BrandsService.updateBrand(id as string, data),
		{
			onSuccess: () => {
				toast.success('success')
				push('/admin/brands')
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const handleFormSubmit = async (data: IBrand) => {
		await mutateAsync(data)
	}

	if (isLoading || mutationLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Add New Brand</H3>
			<CreateForm
				defaultData={brand}
				fields={brandEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}

BrandUpdate.isOnlyUser = true

BrandUpdate.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default BrandUpdate
