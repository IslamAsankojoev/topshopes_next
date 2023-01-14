import { Delete, Edit, Place } from '@mui/icons-material'
import { Button, IconButton, Pagination, Typography } from '@mui/material'
import { AddressesService } from 'api/services/addresses/addresses.service'
import Loading from 'components/Loading'
import TableRow from 'components/TableRow'
import { FlexBox } from 'components/flex-box'
import UserDashboardHeader from 'components/header/UserDashboardHeader'
import CustomerDashboardLayout from 'components/layouts/customer-dashboard'
import CustomerDashboardNavigation from 'components/layouts/customer-dashboard/Navigations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'

const AddressList: NextPageAuth = () => {
	const { push } = useRouter()

	const {
		data: addresses,
		isLoading,
		refetch,
	} = useQuery('address get', AddressesService.getList, {
		select: (data) => data.results,
	})

	const handleDelete = async (id: string) => {
		await AddressesService.delete(id as string)
		refetch()
	}

	return (
		<CustomerDashboardLayout>
			{isLoading ? <Loading /> : null}
			<UserDashboardHeader
				icon={Place}
				title="My Addresses"
				navigation={<CustomerDashboardNavigation />}
				button={
					<Button
						onClick={() => {
							push('/address/create')
						}}
						color="primary"
						sx={{ bgcolor: 'primary.light', px: 4 }}
					>
						Add New Address
					</Button>
				}
			/>

			{addresses?.map((address) => (
				<TableRow sx={{ my: 2, padding: '6px 18px' }} key={address.id}>
					<Typography whiteSpace="pre" m={0.75} textAlign="left">
						{address.city}, {address.street}
					</Typography>

					<Typography flex="1 1 260px !important" m={0.75} textAlign="left">
						{address.country}
					</Typography>

					<Typography whiteSpace="pre" m={0.75} textAlign="left">
						{address.phone}
					</Typography>

					<Typography whiteSpace="pre" textAlign="center" color="grey.600">
						<Link href={`/address/${address.id}`} passHref>
							<IconButton>
								<Edit fontSize="small" color="inherit" />
							</IconButton>
						</Link>

						<IconButton onClick={() => handleDelete(address.id)}>
							<Delete fontSize="small" color="inherit" />
						</IconButton>
					</Typography>
				</TableRow>
			))}

			<FlexBox justifyContent="center" mt={5}>
				<Pagination count={5} onChange={(data) => console.log(data)} />
			</FlexBox>
		</CustomerDashboardLayout>
	)
}

// const orderList = [
// 	{
// 		orderNo: '1050017AS',
// 		status: 'Pending',
// 		purchaseDate: new Date(),
// 		price: 350,
// 	},
// 	{
// 		orderNo: '1050017AS',
// 		status: 'Processing',
// 		purchaseDate: new Date(),
// 		price: 500,
// 	},
// 	{
// 		orderNo: '1050017AS',
// 		status: 'Delivered',
// 		purchaseDate: '2020/12/23',
// 		price: 700,
// 	},
// 	{
// 		orderNo: '1050017AS',
// 		status: 'Delivered',
// 		purchaseDate: '2020/12/23',
// 		price: 700,
// 	},
// 	{
// 		orderNo: '1050017AS',
// 		status: 'Cancelled',
// 		purchaseDate: '2020/12/15',
// 		price: 300,
// 	},
// ]

AddressList.isOnlyUser = true

export default AddressList
