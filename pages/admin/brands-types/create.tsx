import { Box } from '@mui/material'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { brandTypeEditForm } from '../../../src/utils/constants/forms'
import { BrandTypesService } from '../../../src/api/services-admin/brand-types/brandTypes.service'

const CreateBrandTypes = () => {
	const { push } = useRouter()

	const handleFormSubmit = async (data) => {
		await BrandTypesService.createBrandTypes(data)
		push('/admin/brands-types')
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

CreateBrandTypes.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateBrandTypes
