import { Container, styled } from '@mui/material'
import BazaarButton from 'src/components/BazaarButton'
import BazaarCard from 'src/components/BazaarCard'
import LazyImage from 'src/components/LazyImage'
import SEO from 'src/components/SEO'
import { H1, Paragraph } from 'src/components/Typography'
import ShopLayout1 from 'src/components/layouts/ShopLayout1'
import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'

// custom styled components
const Wrapper = styled(BazaarCard)(() => ({
	margin: 'auto',
	padding: '3rem',
	maxWidth: '630px',
	textAlign: 'center',
}))

const StyledButton = styled(BazaarButton)(() => ({
	marginTop: '2rem',
	padding: '11px 24px',
}))

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}

const OrderConfirmation: NextPage = () => {
	return (
		<ShopLayout1>
			<SEO title="Order Confirmation" />
			<Container sx={{ mt: 4, mb: 20 }}>
				<Wrapper>
					<LazyImage
						src="/assets/images/illustrations/party-popper.svg"
						width={116}
						height={116}
					/>
					<H1 lineHeight={1.1} mt="1.5rem">
						Your order is completed!
					</H1>

					<Paragraph color="grey.800" mt="0.3rem">
						You will be receiving confirmation email with order details.
					</Paragraph>

					<Link href="/home-1" passHref>
						<StyledButton
							color="primary"
							disableElevation
							variant="contained"
							className="button-link"
						>
							Browse products
						</StyledButton>
					</Link>
				</Wrapper>
			</Container>
		</ShopLayout1>
	)
}

export default OrderConfirmation
