import { Box } from '@mui/material'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { brandTypeEditForm } from 'utils/constants/forms'
import { BrandTypesService } from '../../../src/api/services-admin/brand-types/brandTypes.service'

const CreateBrandType = ({ id }) => {
	const { push } = useRouter()

	const { data: brandType, isLoading } = useQuery(
		'get brandType one',
		() => BrandTypesService.getBrandTypes(id),
		{
			enabled: !!id,
			cacheTime: 0,
		}
	)

	const handleFormSubmit = async (data) => {
		await BrandTypesService.updateBrandTypes(id, data)
		push('/admin/brands-types')
	}

	return !isLoading ? (
		<Box py={4}>
			<H3 mb={2}>Update Brand Type</H3>
			<CreateForm
				defaultData={brandType}
				fields={brandTypeEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	) : null
}

CreateBrandType.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateBrandType

export const getServerSideProps = async (context) => {
	const { id } = context.params

	return {
		props: {
			id,
		},
	}
}
