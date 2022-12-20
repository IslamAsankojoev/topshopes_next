import { FlexRowCenter } from 'components/flex-box'
import SEO from 'components/SEO'
import { NextPage } from 'next'
import Signup from 'pages-sections/sessions/Signup'
import { NextPageAuth } from 'shared/types/auth.types'

const SignUpPage: NextPageAuth = () => {
	return (
		<FlexRowCenter flexDirection="column" minHeight="100vh">
			<SEO title="Sign up" />
			<Signup />
		</FlexRowCenter>
	)
}

export default SignUpPage
