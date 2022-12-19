import { Box } from '@mui/material'
import { ColorsService } from 'api/services/colors/colors.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { IColors } from 'shared/types/product.types'
import { colorEditForm } from 'utils/constants/forms'


const UpdateColors = ({ id }) => {
	const { push } = useRouter()

	// color mutation
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'color admin update',
		(data: IColors) => ColorsService.updateColor(id, data),
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

	// color fetch
	const { data: color, isLoading } = useQuery(
		'color admin get',
		() => ColorsService.getColor(id),
		{
			enabled: !!id,
			cacheTime: 0,
		}
	)

	const handleFormSubmit = async (data: IColors) => {
		await mutateAsync(data)
	}

	if (isLoading || mutationLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Edit Color</H3>
			<CreateForm
				defaultData={color}
				fields={colorEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}


UpdateColors.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default UpdateColors


export const getServerSideProps = async (context) => {
	const { id } = context.params

	return {
		props: {
			id,
		},
	}
}
