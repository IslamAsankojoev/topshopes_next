import { Box } from '@mui/material'
import { BrandsService } from 'api/services-admin/brands/brand.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { brandEditForm } from 'utils/constants/forms'

const CreateCategory = ({ id }) => {
	const { push } = useRouter()
	const [brand, setBrand] = useState(null)

	const handleFormSubmit = async (data) => {
		await BrandsService.updateBrand(id, data)
		push('/admin/brands')
	}

	useEffect(() => {
		const getBrand = async () => {
			const data = await BrandsService.getBrand(id)
			setBrand(data)
		}
		getBrand()
	}, [])

	return brand ? (
		<Box py={4}>
			<H3 mb={2}>Add New Brand</H3>
			<CreateForm
				defaultData={brand}
				fields={brandEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	) : null
}

CreateCategory.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateCategory

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.params

	return {
		props: {
			id,
		},
	}
}
