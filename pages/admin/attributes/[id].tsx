import { Box } from '@mui/material'
import { AttributesServiceAdmin } from 'api/services-admin/attributes/attributes.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'
import { IProductAttribute } from 'shared/types/product.types'
import { brandTypeEditForm } from 'utils/constants/forms'

const UpdateAttribute: NextPageAuth = () => {
	const {
		push,
		query: { id },
	} = useRouter()

	// brand type fetch
	const { data: attribute, isLoading } = useQuery(
		'get attribute',
		() => AttributesServiceAdmin.get(id as string),
		{
			enabled: !!id,
		}
	)

	// brand type update
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'attribute admin update',
		(data: IProductAttribute) =>
			AttributesServiceAdmin.update(id as string, data),
		{
			onSuccess: () => {
				toast.success('success')
				push('/admin/attributes')
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const handleFormSubmit = async (_: any, data: IProductAttribute) => {
		await mutateAsync(data)
	}

	if (isLoading || mutationLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Update attribute</H3>
			<CreateForm
				defaultData={attribute}
				fields={brandTypeEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}

UpdateAttribute.isOnlyUser = true

UpdateAttribute.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default UpdateAttribute