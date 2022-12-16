import { Box } from '@mui/material'
import { ColorsService } from 'api/services/colors/colors.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { IColors } from 'shared/types/product.types'
import { colorEditForm } from 'utils/constants/forms'

const CreateColor = () => {
	const { push } = useRouter()

	// color mutation
	const { isLoading, mutateAsync } = useMutation(
		'color admin create',
		(data: IColors) => ColorsService.createColor(data),
		{
			onSuccess: () => {
				toast.success('success')
				push('/admin/colors')
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const handleFormSubmit = async (data: IColors) => {
		await mutateAsync(data)
	}

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Add New Color</H3>
			<CreateForm
				defaultData={{}}
				fields={colorEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}

CreateColor.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateColor
