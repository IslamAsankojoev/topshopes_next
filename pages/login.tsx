import SEO from 'src/components/SEO'
import { FlexRowCenter } from 'src/components/flex-box'
import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Login from 'src/pages-sections/sessions/Login'
import { NextPageAuth } from 'src/shared/types/auth.types'

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
			<SEO title="Login" description='Войти в аккаунт'/>
			<Login />
		</FlexRowCenter>
	)
}

export default LoginPage
