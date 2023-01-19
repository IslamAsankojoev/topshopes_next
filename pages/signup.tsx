import SEO from 'components/SEO'
import { FlexRowCenter } from 'components/flex-box'
import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Signup from 'pages-sections/sessions/Signup'
import { NextPageAuth } from 'shared/types/auth.types'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}
// =

const SignUpPage: NextPageAuth = () => {
	return (
		<FlexRowCenter flexDirection="column" minHeight="100vh">
			<SEO title="Sign up" />
			<Signup />
		</FlexRowCenter>
	)
}

export default SignUpPage
