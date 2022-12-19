import { Box } from '@mui/material'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { ISize } from 'shared/types/size.types'
import { SizesService } from '../../../src/api/services/sizes/sizes.service'
import { sizeEditForm } from '../../../src/utils/constants/forms'

const CreateSizes = () => {
	const { push } = useRouter()

	// size mutation
	const { isLoading, mutateAsync } = useMutation(
		'size admin create',
		(data: ISize) => SizesService.createSize(data),
		{
			onSuccess: () => {
				toast.success('success')
				push('/admin/sizes')
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const handleFormSubmit = async (data: ISize) => {
		await mutateAsync(data)
	}

	if (isLoading) {
		return <Loading />
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
