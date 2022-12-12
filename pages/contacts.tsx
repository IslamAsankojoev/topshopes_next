import ShopLayout1 from 'components/layouts/ShopLayout1'
import React from 'react'
import SEO from '../src/components/SEO'
import { Container } from '@mui/system'
import ContactsForm from '../src/pages-sections/contacts/ContactsForm'
import styled from '@emotion/styled'

const ContactsPage = ({ cook }) => {
	return (
		<ShopLayout1>
			<SEO title="Contacts" />
			<Container sx={{ pb: '1rem' }}>
				<Wrapper>
					<ContactsInfo>
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.8244785922875!2d74.59274341519722!3d42.876548710320314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7dfbc0ce10f%3A0xa896b350a5d0a656!2zMjE5INC_0YDQvtGB0L8uINCn0YPQuSwg0JHQuNGI0LrQtdC6!5e0!3m2!1sru!2skg!4v1670481929596!5m2!1sru!2skg"
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
