import { Box } from '@mui/material'
import { ColorsService } from 'api/services/colors/colors.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { sizeEditForm } from 'utils/constants/forms'
import { SizesService } from '../../../src/api/services/sizes/sizes.service'

const CreateCategory = ({ id }) => {
	const { push } = useRouter()

	const { data: size, isLoading } = useQuery(
		'get size one',
		() => SizesService.getSize(id),
		{
			enabled: !!id,
			cacheTime: 0,
		}
	)

	const handleFormSubmit = async (data) => {
		await SizesService.updateSize(id, data)
		push('/admin/sizes')
	}

	return !isLoading ? (
		<Box py={4}>
			<H3 mb={2}>Update Size</H3>
			<CreateForm
				defaultData={size}
				fields={sizeEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	) : null
}

CreateCategory.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateCategory

export const getServerSideProps = async (context) => {
	const { id } = context.params

	return {
		props: {
			id,
		},
	}
}
