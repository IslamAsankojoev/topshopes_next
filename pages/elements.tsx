import { Box, Button, Container } from '@mui/material'
import { H2, Paragraph } from 'src/components/Typography'
import { FlexRowCenter } from 'src/components/flex-box'
import ShopLayout1 from 'src/components/layouts/ShopLayout1'
import Navbar from 'src/components/navbar/Navbar'
import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}

const Elements: NextPage = () => {
	return (
		<ShopLayout1>
			<Navbar />

			<Container sx={{ py: 4 }}>
				<Box textAlign="center" mb={8}>
					<H2>Different Button Backgrounds</H2>
					<Paragraph>There are 9 button types classified by color.</Paragraph>

					<FlexRowCenter mt={4} gap={2} flexWrap="wrap">
						<Button color="inherit">Default</Button>
						<Button color="primary">Primary</Button>
						<Button color="secondary">Secondary</Button>
						<Button color="success">Success</Button>
						<Button color="error">Error</Button>
						<Button color="info">Info</Button>
						<Button color="warning">Warning</Button>
						<Button color="marron">Marron</Button>
						<Button color="paste">Paste</Button>
					</FlexRowCenter>
				</Box>

				<Box textAlign="center" mb={8}>
					<H2>Different Outline Buttons</H2>
					<Paragraph>Make Outline Type Buttons with Different Color</Paragraph>

					<FlexRowCenter mt={4} gap={2} flexWrap="wrap">
						<Button variant="outlined" color="inherit">
							Default
						</Button>
						<Button variant="outlined" color="primary">
							Primary
						</Button>
						<Button variant="outlined" color="secondary">
							Secondary
						</Button>
						<Button variant="outlined" color="success">
							Success
						</Button>
						<Button variant="outlined" color="error">
							Error
						</Button>
						<Button variant="outlined" color="info">
							Info
						</Button>
						<Button variant="outlined" color="warning">
							Warning
						</Button>
						<Button variant="outlined" color="marron">
							Marron
						</Button>
						<Button variant="outlined" color="paste">
							Paste
						</Button>
					</FlexRowCenter>
				</Box>

				<Box textAlign="center">
					<H2>Different Button Sizes</H2>
					<Paragraph>
						Choose Button Size from Large, Normal, Medium, Small.
					</Paragraph>

					<FlexRowCenter mt={4} gap={2} flexWrap="wrap">
						<Button size="large">Large Size</Button>
						<Button>Medium Size</Button>
						<Button size="normal">Normal Size</Button>
						<Button size="small">Small Size</Button>
					</FlexRowCenter>
				</Box>
			</Container>
		</ShopLayout1>
	)
}

export default Elements
