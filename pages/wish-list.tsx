import Favorite from '@mui/icons-material/Favorite'
import { Button, Grid, Pagination } from '@mui/material'
import SEO from 'components/SEO'
import { FlexBox } from 'components/flex-box'
import UserDashboardHeader from 'components/header/UserDashboardHeader'
import CustomerDashboardLayout from 'components/layouts/customer-dashboard'
import CustomerDashboardNavigation from 'components/layouts/customer-dashboard/Navigations'
import ProductCard1 from 'components/product-cards/ProductCard1'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { NextPageAuth } from 'shared/types/auth.types'
import { IProduct, IProductPreview } from 'shared/types/product.types'

const WishList: NextPageAuth = () => {
	const wihListItems = useTypedSelector((state) => state.wishStore.items)
	return (
		<CustomerDashboardLayout>
			<SEO title="Wishlist" />
			<UserDashboardHeader
				icon={Favorite}
				title="My Wish List"
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
						<Grid item lg={4} sm={6} xs={6} key={item.id}>
							<ProductCard1 product={{ ...item, thumbnail: item.imgUrl }} />
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

WishList.isOnlyUser = true

export default WishList
