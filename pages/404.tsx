import { Button, IconButton } from '@mui/material'
import BazaarImage from 'src/components/BazaarImage'
import SEO from 'src/components/SEO'
import { FlexBox, FlexRowCenter } from 'src/components/flex-box'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Error404: NextPage = () => {
	const router = useRouter()
	const handleGoBack = () => router.back()

	return (
		<FlexRowCenter px={2} minHeight="100vh" flexDirection="column">
			<SEO title="Страница не найдена" />
			<BazaarImage
				src="/assets/images/illustrations/404.svg"
				sx={{ display: 'block', maxWidth: 320, width: '100%', mb: 3 }}
			/>

			<FlexBox flexWrap="wrap">
				<Button
					variant="outlined"
					color="primary"
					sx={{ m: 1 }}
					onClick={handleGoBack}
				>
					Go Back
				</Button>

				<Link href="/" passHref>
					<Button variant="contained" color="primary" sx={{ m: 1 }}>
						Go to Home
					</Button>
				</Link>
				<IconButton></IconButton>
			</FlexBox>
		</FlexRowCenter>
	)
}

export default Error404
