import styled from '@emotion/styled'
import { Grid, TextField } from '@mui/material'
import { Container } from '@mui/system'
import ShopLayout1 from 'components/layouts/ShopLayout1'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import gmailImg from '../public/assets/images/banner.webp'
import SEO from '../src/components/SEO'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['about', 'common'])),
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
				<Grid container spacing={{ xs: 2, md: 10 }}>
					<Grid item xs={12} sm={6} alignSelf={'center'}>
						<img
							src={'/assets/images/logo.svg'}
							alt="aboutUsTopshopes"
							width={'100%'}
						/>
					</Grid>

					<Grid item xs={12} sm={6} alignSelf={'center'}>
						<h1>TopShopes</h1>
						<p>{t('topshopes-data')}</p>
					</Grid>

					<Grid item xs={12}>
						<GmailDiv>
							<GmailImg></GmailImg>

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

					<Grid item xs={12} sm={6} alignSelf={'center'}>
						<h1>{t('more-about-us')}</h1>
						<p>{t('more-data')}</p>
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
		grid-template-rows: 0.5fr;
		img {
			display: none;
		}
	}
`

const GmailImg = styled.div`
	height: 100%;
	background: url(${gmailImg.src}) no-repeat;
	background-size: cover;
	background-position: center;
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
`

export default AboutPage
