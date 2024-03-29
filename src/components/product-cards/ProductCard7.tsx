/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Close, Remove } from '@mui/icons-material'
import { Button, Card, IconButton, styled } from '@mui/material'
import Image from 'src/components/BazaarImage'
import { Span } from 'src/components/Typography'
import { FlexBox } from 'src/components/flex-box'
import { useAppContext } from 'src/contexts/AppContext'
import { useActions } from 'src/hooks/useActions'
import Link from 'next/link'
import { FC, useCallback } from 'react'
import { ICartItem } from 'src/store/cart/cart.interface'
import { getCurrency } from 'src/utils/getCurrency'

// styled components
const Wrapper = styled(Card)(({ theme }) => ({
	display: 'flex',
	overflow: 'hidden',
	alignItems: 'center',
	position: 'relative',
	borderRadius: '10px',
	marginBottom: '1.5rem',
	boxShadow: theme.shadows[2],
	backgroundColor: theme.palette.background.paper,

	'@media only screen and (max-width: 425px)': {
		flexWrap: 'wrap',
		img: { height: 'auto', minWidth: '100%' },
	},
}))

// =========================================================

const ProductCard7: FC<ICartItem> = (product) => {
	const { category, name, rating, slug, variants, children, qty, id } = product
	const { addToCart, removeFromCart, trashFromCart } = useActions()

	const handleAddToCart = useCallback(() => {
		addToCart(product)
	}, [])

	const handleRemoveFromCart = useCallback(() => {
		removeFromCart(product)
	}, [])
	const handleTrashFromCart = useCallback(() => {
		trashFromCart(product)
	}, [])

	return (
		<Wrapper>
			<Image
				alt={name}
				width={140}
				height={140}
				display="block"
				src={variants[0]?.thumbnail || '/assets/images/products/iphone-xi.png'}
			/>

			<IconButton
				size="small"
				onClick={handleTrashFromCart}
				sx={{ position: 'absolute', right: 15, top: 15 }}
			>
				<Close fontSize="small" />
			</IconButton>

			<FlexBox p={2} rowGap={2} width="100%" flexDirection="column">
				<Link href={`/product/${id}`}>
					<a>
						<Span ellipsis fontWeight="600" fontSize={18}>
							{name}
						</Span>
					</a>
				</Link>

				<FlexBox gap={1} flexWrap="wrap" alignItems="center">
					<Span color="grey.600">
						{getCurrency(Number(variants[0]?.price))} x {qty}
					</Span>

					<Span fontWeight={600} color="primary.main">
						{getCurrency(Number(variants[0]?.price) * qty)}
					</Span>
				</FlexBox>

				<FlexBox alignItems="center">
					<Button
						color="primary"
						sx={{ p: '5px' }}
						variant="outlined"
						disabled={qty === 1}
						onClick={handleRemoveFromCart}
					>
						<Remove fontSize="small" />
					</Button>

					<Span mx={1} fontWeight={600} fontSize={15}>
						{qty}
					</Span>
					<Button
						color="primary"
						sx={{ p: '5px' }}
						variant="outlined"
						onClick={handleAddToCart}
					>
						<Add fontSize="small" />
					</Button>
				</FlexBox>
			</FlexBox>
		</Wrapper>
	)
}

export default ProductCard7
