import { Box } from '@mui/material'
import { BrandsService } from 'api/services-admin/brands/brand.service'
import { ColorsService } from 'api/services/colors/colors.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { colorEditForm } from 'utils/constants/forms'

const CreateCategory = ({ id }) => {
	const { push } = useRouter()

	const { data: color, isLoading } = useQuery(
		'get color one',
		() => ColorsService.getColor(id),
		{
			enabled: !!id,
			cacheTime: 0,
		}
	)

	const handleFormSubmit = async (data) => {
		await ColorsService.updateColor(id, data)
		push('/admin/colors')
	}

	return !isLoading ? (
		<Box py={4}>
			<H3 mb={2}>Add New Brand</H3>
			<CreateForm
				defaultData={color}
				fields={colorEditForm}
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
