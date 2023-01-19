import styled from '@emotion/styled'
import { Container } from '@mui/system'
import { axiosClassic } from 'api/interceptor'
import ShopLayout1 from 'components/layouts/ShopLayout1'
import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { QueryClient, dehydrate, useQuery } from 'react-query'
import { SiteSettings } from 'utils/constants/site-settings'

import SEO from '../src/components/SEO'
import ContactsForm from '../src/pages-sections/contacts/ContactsForm'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	try {
		const queryClient = new QueryClient()
		await queryClient.prefetchQuery(['get site settings'], () =>
			axiosClassic.get('/settings/').then((response) => response.data)
		)
		return {
			props: {
				dehydratedState: dehydrate(queryClient),
				...(await serverSideTranslations(locale as string, [
					'common',
					'contacts',
				])),
			},
			revalidate: 10,
		}
	} catch {
		return {
			props: {
				...(await serverSideTranslations(locale as string, [
					'common',
					'contacts',
				])),
			},
			revalidate: 10,
		}
	}
}

const ContactsPage: NextPage<{ map: string; data: any }> = () => {
	const { data: settings } = useQuery('get site settings', () =>
		axiosClassic.get('/settings/').then((response) => response.data)
	)
	return (
		<ShopLayout1>
			<SEO title="Contacts" />
			<Container sx={{ pb: '1rem' }}>
				<Wrapper>
					<ContactsInfo>
						<iframe
							src={settings?.['map'] || SiteSettings['map']}
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
