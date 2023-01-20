import { FlexRowCenter } from 'components/flex-box'
import SEO from 'components/SEO'
import { NextPage } from 'next'
import Signup from 'pages-sections/sessions/Signup'
import { NextPageAuth } from 'shared/types/auth.types'

const SignUpPage: NextPageAuth = () => {
	return (
		<FlexRowCenter
			flexDirection="column"
			minHeight="100vh"
			sx={{
				margin: '0px 30px',
			}}
		>
			<SEO title="Sign up" />
			<Signup />
		</FlexRowCenter>
	)
}

export default SignUpPage
