import { Delete, Edit, Place } from '@mui/icons-material'
import { Button, IconButton, Pagination, Typography } from '@mui/material'
import { AddressesService } from 'src/api/services/addresses/addresses.service'
import TableRow from 'src/components/TableRow'
import { FlexBox } from 'src/components/flex-box'
import UserDashboardHeader from 'src/components/header/UserDashboardHeader'
import CustomerDashboardLayout from 'src/components/layouts/customer-dashboard'
import CustomerDashboardNavigation from 'src/components/layouts/customer-dashboard/Navigations'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				'common',
				'admin',
				'adminActions',
			])),
		},
	}
}

const AddressList: NextPageAuth = () => {
	const { t } = useTranslation('common')
	const { push, query, pathname } = useRouter()

	const { data: addresses, refetch } = useQuery(
		`address get page=${query?.page}`,
		() =>
			AddressesService.getList({
				page: (query?.page as string) || 1,
				page_size: 20,
			})
	)

	const handleDelete = async (id: string) => {
		await AddressesService.delete(id as string)
		refetch()
	}

	return (
		<CustomerDashboardLayout>
			<UserDashboardHeader
				icon={Place}
				title={t('myAddresses')}
				navigation={<CustomerDashboardNavigation />}
				button={
					<Button
						onClick={() => {
							push('/address/create')
						}}
						color="primary"
						sx={{ bgcolor: 'primary.light', px: 4 }}
					>
						{t('addAddress')}
					</Button>
				}
			/>

			{addresses?.results?.map((address) => (
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
				<Pagination
					page={+query?.page || 1}
					count={Math.ceil(addresses?.count / 20)}
					onChange={(_, newValue) =>
						push({
							pathname,
							query: {
								page: newValue,
							},
						})
					}
				/>
			</FlexBox>
		</CustomerDashboardLayout>
	)
}


AddressList.isOnlyAuth = true

export default AddressList
