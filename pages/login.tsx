import SEO from 'components/SEO'
import { FlexRowCenter } from 'components/flex-box'
import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Login from 'pages-sections/sessions/Login'
import { NextPageAuth } from 'shared/types/auth.types'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}

const LoginPage: NextPageAuth = () => {
	return (
		<FlexRowCenter
			flexDirection="column"
			minHeight="100vh"
			sx={{
				padding: '30px',
			}}
		>
			<SEO title="Login" />
			<Login />
		</FlexRowCenter>
	)
}

export default LoginPage
