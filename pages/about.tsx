import styled from '@emotion/styled'
import { Grid, TextField } from '@mui/material'
import { Container } from '@mui/system'
import ShopLayout1 from 'components/layouts/ShopLayout1'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React from 'react'

import SEO from '../src/components/SEO'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['about'])),
		},
	}
}

// aboutUsTopshopes.webp
const AboutPage: React.FC = () => {
	const { t } = useTranslation('about')

	return (
		<ShopLayout1>
			<SEO title="About" />
			<Container sx={{ pb: '2rem', pt: '2rem' }}>
				<Grid container spacing={{ xs: 2, md: 10 }} alignItems={'center'}>
					<Grid item xs={12} sm={6} alignSelf={'center'}>
						<img
							src={'/assets/images/logo.svg'}
							alt="aboutUsTopshopes"
							width={'100%'}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<List>
							<h2>TopShopes</h2>
							<p>{t('topshopes-data')}</p>
						</List>
					</Grid>

					<Grid item xs={12}>
						<GmailDiv>
							<img
								src={'/assets/images/banner.png'}
								alt="aboutUsTopshopes"
								width={'100%'}
							/>

							<GmailForm>
								<div>
									<h1>TopShopes news</h1>
									<p>{t('news')}</p>
								</div>
								<form>
									<TextField
										fullWidth
										type={'email'}
										sx={{ borderColor: 'white' }}
										placeholder="Ваш email"
									/>
									<br />
									<br />
									<span>{t('captcha')}</span>
								</form>
							</GmailForm>
						</GmailDiv>
					</Grid>

					<Grid item xs={12} sm={6}>
						<List>
							<h2>{t('more-about-us')}</h2>
							<p>{t('more-data')}</p>
						</List>
					</Grid>
					<Grid item xs={12} sm={6} alignSelf={'center'}>
						<img
							src={'/assets/images/aboutUsTopshopes.png'}
							alt="aboutUsTopshopes"
							width={'100%'}
						/>
					</Grid>
				</Grid>
			</Container>
		</ShopLayout1>
	)
}

const GmailDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr;
	align-items: center;

	@media (max-width: 900px) {
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 0.5fr;
	}
	@media (max-width: 530px) {
		grid-template-rows: 0.5fr;
		img {
			display: none;
		}
	}
`

const GmailForm = styled.div`
	height: 100%;
	padding: 50px;
	color: whitesmoke;
	background: #18202a;

	display: flex;
	flex-direction: column;
	justify-content: center;

	h1 {
		margin: 0;
		font-size: calc(1rem + 0.9vw);
		text-align: left;
		color: #ff6d00;
	}
	p {
		margin-bottom: 30px;
	}
	label {
		color: gray !important;
	}
	input {
		border: 1px solid gray;
		border-radius: 4.4px;
		background: whitesmoke !important;
	}
	span {
		font-size: 10px;
	}

	@media (max-width: 1190px) {
		padding: 20px 40px;
	}
	@media (max-width: 1000px) {
		padding: 10px 40px;
	}
	@media (max-width: 900px) {
		padding: 40px;
	}
`

const List = styled.ul`
	list-style: initial;
	padding-left: calc(1.5rem + 0.9vw);
	h2 {
		font-weight: 700;
		font-size: calc(1.5rem + 0.9vw);
	}
	li {
		margin: 10px 0;
		span {
			font-weight: 700;
		}
	}
`
export default AboutPage
