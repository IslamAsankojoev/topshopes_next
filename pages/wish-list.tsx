import Favorite from '@mui/icons-material/Favorite'
import { Grid, Pagination } from '@mui/material'
import SEO from 'src/components/SEO'
import { FlexBox } from 'src/components/flex-box'
import UserDashboardHeader from 'src/components/header/UserDashboardHeader'
import CustomerDashboardLayout from 'src/components/layouts/customer-dashboard'
import CustomerDashboardNavigation from 'src/components/layouts/customer-dashboard/Navigations'
import ProductCard1 from 'src/components/product-cards/ProductCard1'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { IProductPreview } from 'src/shared/types/product.types'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}

const WishList: NextPageAuth = () => {
	const { t } = useTranslation('common')
	const wihListItems = useTypedSelector((state) => state.wishStore.items)
	return (
		<CustomerDashboardLayout>
			<SEO title={t('wishlist')} />
			<UserDashboardHeader
				icon={Favorite}
				title={t('myWishlist')}
				navigation={<CustomerDashboardNavigation />}
				// button={
				//   <Button color="primary" sx={{ px: 4, bgcolor: 'primary.light' }}>
				//     Add All to Cart
				//   </Button>
				// }
			/>

			<Grid container spacing={3}>
				{wihListItems
					?.map((item: IProductPreview | any) => (
						<Grid item lg={4} sm={6} xs={6} ref={item.nodeRef}>
							<ProductCard1 product={{ ...item }} />
						</Grid>
					))
					.reverse()}
			</Grid>

			<FlexBox justifyContent="center" mt={5}>
				<Pagination
					count={5}
					color="primary"
					variant="outlined"
					onChange={(data) => console.log(data)}
				/>
			</FlexBox>
		</CustomerDashboardLayout>
	)
}

WishList.isOnlyAuth = true

export default WishList
