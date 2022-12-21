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
import { ISize } from 'shared/types/size.types'
import { sizeEditForm } from 'utils/constants/forms'
import { SizesService } from '../../../src/api/services/sizes/sizes.service'

const UpdateSize: NextPageAuth = () => {
	const {
		push,
		query: { id },
	} = useRouter()

	// size fetch
	const { data: size, isLoading } = useQuery(
		'size admin get',
		() => SizesService.get(id as string),
		{
			enabled: !!id,
		}
	)

	// size mutation
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'size admin update',
		(data: ISize) => SizesService.update(id as string, data),
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

	if (isLoading || mutationLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Update Size</H3>
			<CreateForm
				defaultData={size}
				fields={sizeEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}

UpdateSize.isOnlyUser = true

UpdateSize.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default UpdateSize
