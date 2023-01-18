import styled from '@emotion/styled'
import { Grid, TextField } from '@mui/material'
import { Container } from '@mui/system'
import ShopLayout1 from 'components/layouts/ShopLayout1'
import React from 'react'

import SEO from '../src/components/SEO'

// aboutUsTopshopes.webp
const AboutPage: React.FC = () => {
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
							<p>
								Наша компания является ведущим производителем и поставщиком
								ароматизаторов для дома и бизнеса. Мы предлагаем широкий выбор
								ароматов, качественные ингредиенты и инновационные решения для
								ароматизации помещений. Кроме того, мы имеем свой собственный
								маркетплейс, где клиенты могут легко просматривать и покупать
								наши продукты онлайн.
							</p>
							<p>
								Наша миссия - помочь нашим клиентам создать приятную и уютную
								атмосферу в их домах и местах работы. Мы работаем над развитием
								новых ароматов и современных технологий для ароматизации, чтобы
								предложить нашим клиентам все лучшее.
							</p>
							<p>
								Спасибо, что выбрали нашу компанию и наш маркетплейс. Мы будем
								рады предоставить Вам лучшие продукты и услуги. Посетите наш
								маркет
							</p>
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
									<p>
										Новости TopsShopes Подпишитесь на последние новости, факты,
										анализ и оригинальные истории об TopsShopes, доставленные
										вам.
									</p>
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
									<span>
										Защищено reCAPTCHA. Применяются Политика конфиденциальности
										и Условия использования Google
									</span>
								</form>
							</GmailForm>
						</GmailDiv>
					</Grid>

					<Grid item xs={12} sm={6}>
						<List>
							<h2>Подробнее о нас</h2>
							<p>
								TopShopes первая крупнейшая платформа электронной коммерции в
								Центральной Азии со штаб-квартирой в Бишкеке, Кыргызстан. Fed
								Иншаат и Текстиль San. И внешний Tic.ООО.STI.
								<br /> Основан под названием.
							</p>{' '}
							<p>
								TopShopes – это торговый сайт, который начал свою деятельность с
								2022 года и доступен для всех. Благодаря большому ассортименту
								предлагаемых товаров и услуг он превратился в большой
								маркетплейлист.
							</p>{' '}
							<p>
								Существует множество категорий, включая косметику, моду,
								электронику, мебель и предметы домашнего ухода. Благодаря новым
								технологиям, мы оцифровываем свою торговую площадку .<br /> Наш
								маркетплейс объединяет тысячи предприятий, ведет цифровую
								трансформацию , исследований и разработок.
							</p>{' '}
							<p>
								Мы укрепляем нашу технологическую компани конструктивным
								образом.
								<br /> Внедряя инновации в систему электронной коммерции в
								Бишкеке.
							</p>{' '}
							<p>Добро пожаловать на наш маркетплейс Topshopes</p>
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
