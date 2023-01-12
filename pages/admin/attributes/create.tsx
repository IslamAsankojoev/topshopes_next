import { Box } from '@mui/material'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { attributeEditForm } from 'utils/constants/forms'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import Loading from 'components/Loading'
import { NextPageAuth } from 'shared/types/auth.types'
import { AttributesServiceAdmin } from 'api/services-admin/attributes/attributes.service'
import { IProductAttribute } from 'shared/types/product.types'

const CreateAttribute: NextPageAuth = () => {
	const { push } = useRouter()

	// attributes type create
	const { isLoading, mutateAsync } = useMutation(
		'attributes admin create',
		(data: IProductAttribute) => AttributesServiceAdmin.create(data),
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

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Add New attribute</H3>
			<CreateForm
				defaultData={{}}
				fields={attributeEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}
CreateAttribute.isOnlyUser = true

CreateAttribute.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateAttribute
