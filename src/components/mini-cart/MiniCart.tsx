/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Close, Remove } from '@mui/icons-material'
import { Box, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import BazaarAvatar from 'components/BazaarAvatar'
import BazaarButton from 'components/BazaarButton'
import BazaarIconButton from 'components/BazaarIconButton'
import LazyImage from 'components/LazyImage'
import { H5, Tiny } from 'components/Typography'
import { FlexBox } from 'components/flex-box'
import ShoppingBagOutlined from 'components/icons/ShoppingBagOutlined'
import { CartItem, useAppContext } from 'contexts/AppContext'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React, { useCallback } from 'react'
import { ICartItem } from 'store/cart/cart.interface'

// =========================================================
type MiniCartProps = { toggleSidenav?: () => void }
// =========================================================

const MiniCart: React.FC<MiniCartProps> = ({ toggleSidenav }) => {
	const { t } = useTranslation('common')
	const { palette } = useTheme()
	const {
		cart: cartList,
		total_price,
		total_items,
	} = useTypedSelector((state) => state.cartStore)
	const { addToCart, removeFromCart, trashFromCart } = useActions()

	// handle add to cart

	const handleAddToCart = useCallback(
		(item: ICartItem) => () => {
			addToCart(item)
		},
		[]
	)

	const handleRemoveFromCart = useCallback(
		(item: ICartItem) => () => {
			removeFromCart(item)
		},
		[]
	)

	const handleTrashFromCart = useCallback(
		(item: ICartItem) => () => {
			trashFromCart(item)
		},
		[]
	)

	return (
		<Box width="380px">
			<Box
				overflow="auto"
				height={`calc(100vh - ${
					!!cartList?.length ? '80px - 3.25rem' : '0px'
				})`}
			>
				<FlexBox
					alignItems="center"
					m="0px 20px"
					height="74px"
					color="secondary.main"
				>
					<ShoppingBagOutlined color="inherit" />
					<Box fontWeight={600} fontSize="16px" ml={1}>
						{cartList?.length} {t('product')}
					</Box>
				</FlexBox>

				<Divider />

				{!!!cartList?.length && (
					<FlexBox
						alignItems="center"
						flexDirection="column"
						justifyContent="center"
						height="calc(100% - 74px)"
					>
						<LazyImage
							src="/assets/images/logos/shopping-bag.svg"
							width={90}
							height={100}
						/>
						<Box
							component="p"
							mt={2}
							color="grey.600"
							textAlign="center"
							maxWidth="200px"
						>
							{t('bagEmpty')}
						</Box>
					</FlexBox>
				)}

				{cartList?.map((item: ICartItem) => (
					<FlexBox
						py={2}
						px={2.5}
						key={item.id}
						alignItems="center"
						borderBottom={`1px solid ${palette.divider}`}
					>
						<FlexBox alignItems="center" flexDirection="column">
							<BazaarButton
								color="primary"
								variant="outlined"
								onClick={handleAddToCart(item)}
								sx={{ height: '32px', width: '32px', borderRadius: '300px' }}
							>
								<Add fontSize="small" />
							</BazaarButton>

							<Box fontWeight={600} fontSize="15px" my="3px">
								{item.qty}
							</Box>

							<BazaarButton
								color="primary"
								variant="outlined"
								disabled={item.qty === 1}
								onClick={handleRemoveFromCart(item)}
								sx={{ height: '32px', width: '32px', borderRadius: '300px' }}
							>
								<Remove fontSize="small" />
							</BazaarButton>
						</FlexBox>

						<Link href={`/product/${item.id}`}>
							<a>
								<BazaarAvatar
									mx={2}
									width={76}
									height={76}
									alt={item.name}
									src={
										item?.variants[0]?.thumbnail ||
										'/assets/images/products/iphone-x.png'
									}
								/>
							</a>
						</Link>

						<Box flex="1 1 0">
							<Link href={`/product/${item.id}`}>
								<a>
									<H5 className="title" fontSize="14px">
										{item.name}
									</H5>
								</a>
							</Link>

							<Tiny color="grey.600">
								${Number(item?.variants[0]?.overall_price).toFixed(2)}c x{' '}
								{item.qty}
							</Tiny>

							<Box
								fontWeight={600}
								fontSize="14px"
								color="primary.main"
								mt={0.5}
							>
								$
								{(item.qty * Number(item?.variants[0]?.overall_price)).toFixed(
									2
								)}
								c
							</Box>
						</Box>

						<BazaarIconButton
							ml={2.5}
							size="small"
							onClick={handleTrashFromCart(item)}
						>
							<Close fontSize="small" />
						</BazaarIconButton>
					</FlexBox>
				))}
			</Box>

			{!!cartList?.length && (
				<Box p={2.5}>
					<Link href="/checkout-alternative" passHref>
						<BazaarButton
							fullWidth
							color="primary"
							variant="contained"
							sx={{ mb: '0.75rem', height: '40px' }}
							onClick={toggleSidenav}
						>
							{t('checkoutNow')} (${total_price.toFixed(2)})
						</BazaarButton>
					</Link>

					<Link href="/cart" passHref>
						<BazaarButton
							fullWidth
							color="primary"
							variant="outlined"
							sx={{ height: 40 }}
							onClick={toggleSidenav}
						>
							{t('viewCart')}
						</BazaarButton>
					</Link>
				</Box>
			)}
		</Box>
	)
}

MiniCart.defaultProps = {
	toggleSidenav: () => {},
}

export default MiniCart
