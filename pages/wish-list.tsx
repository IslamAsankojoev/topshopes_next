import Favorite from '@mui/icons-material/Favorite'
import { Button, Grid, Pagination } from '@mui/material'
import SEO from 'components/SEO'
import { FlexBox } from 'components/flex-box'
import UserDashboardHeader from 'components/header/UserDashboardHeader'
import CustomerDashboardLayout from 'components/layouts/customer-dashboard'
import CustomerDashboardNavigation from 'components/layouts/customer-dashboard/Navigations'
import ProductCard1 from 'components/product-cards/ProductCard1'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { createRef, useRef } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { NextPageAuth } from 'shared/types/auth.types'
import { IProduct, IProductPreview } from 'shared/types/product.types'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}
// =

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
				<TransitionGroup component={null}>
					{wihListItems
						?.map((item: IProductPreview | any) => (
							<CSSTransition
								key={item.id}
								timeout={230}
								sx={{
									'&.fade-enter': {
										opacity: 0,
										transform: 'scale(.8)',
									},
									'&.fade-enter-active': {
										opacity: 1,
										transform: 'scale(1)',
										transition: 'all 230ms ease-in-out',
									},
									'&.fade-exit': {
										opacity: 1,
										transform: 'scale(1)',
									},
									'&.fade-exit-active': {
										opacity: 0,
										transform: 'scale(.8)',
										transition: 'all 230ms ease-in-out',
									},
								}}
								unmountOnExit
								classNames="fade"
								nodeRef={item.nodeRef}
							>
								<Grid item lg={4} sm={6} xs={6} ref={item.nodeRef}>
									<ProductCard1 product={{ ...item }} />
								</Grid>
							</CSSTransition>
						))
						.reverse()}
				</TransitionGroup>
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
