import ShopLayout1 from 'components/layouts/ShopLayout1'
import React from 'react'
import SEO from '../src/components/SEO'
import { Container } from '@mui/system'
import ContactsForm from '../src/pages-sections/contacts/ContactsForm'
import styled from '@emotion/styled'
import { GetStaticProps, NextPage } from 'next'
import { axiosClassic } from 'api/interceptor'

export const getStaticProps: GetStaticProps = async () => {
	const { data } = await axiosClassic.get('/settings/1/')
	return { props: { map: data?.map }, revalidate: 86400 }
}

const ContactsPage: NextPage<{ map: string; data: any }> = ({ map }) => {
	return (
		<ShopLayout1>
			<SEO title="Contacts" />
			<Container sx={{ pb: '1rem' }}>
				<Wrapper>
					<ContactsInfo>
						<iframe
							src={map}
							width="100%"
							height="100%"
							style={{ border: 0 }}
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						></iframe>
					</ContactsInfo>
					<ContactsForm />
				</Wrapper>
			</Container>
		</ShopLayout1>
	)
}

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr;
	grid-gap: 0 20px;
	justify-items: center;
	margin: 40px 0;
	@media (max-width: 900px) {
		& {
			grid-template-columns: 1fr;
			justify-items: center;
		}
	}
`
const ContactsInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

	max-width: 470px;
	width: 100%;
`

export default ContactsPage
