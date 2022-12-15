import { Box } from '@mui/material'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { SizesService } from '../../../src/api/services/sizes/sizes.service'
import { sizeEditForm } from '../../../src/utils/constants/forms'

const CreateSizes = () => {
	const { push } = useRouter()

	const handleFormSubmit = async (data) => {
		await SizesService.createSize(data)
		push('/admin/sizes')
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Add New Size</H3>
			<CreateForm
				defaultData={{}}
				fields={sizeEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}

CreateSizes.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateSizes
