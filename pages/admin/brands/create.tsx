import { Box } from '@mui/material'
import { BrandsService } from 'api/services-admin/brands/brand.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { brandEditForm } from 'utils/constants/forms'

const CreateCategory = () => {
	const { push } = useRouter()

	const { mutateAsync } = useMutation(
		'create brand',
		(data) => BrandsService.createBrand(data),
		{
			onSuccess: () => {
				push('/admin/brands')
			},
		}
	)

	const handleFormSubmit = async (data) => {
		await mutateAsync(data)
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Add New Brand</H3>
			<CreateForm
				defaultData={{}}
				fields={brandEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}

CreateCategory.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateCategory
