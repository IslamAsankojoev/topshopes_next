import styled from '@emotion/styled'
import { Grid } from '@mui/material'
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
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<img
							src={'/assets/images/aboutUsTopshopes.png'}
							alt="aboutUsTopshopes"
							width={'100%'}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<List>
							<h2>Topshopes</h2>
							<p>
								Topshopes первая крупнейшая платформа электронной коммерции в
								Центральной Азии со штаб-квартирой в Бишкеке, Кыргызстан. Fed
								Иншаат и Текстиль San. И внешний Tic.ООО.STI.
								<br /> Основан под названием.
							</p>{' '}
							<p>
								Topshopes – это торговый сайт, который начал свою деятельность с
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
				</Grid>
			</Container>
		</ShopLayout1>
	)
}

const Wrapper = styled(Container)`
	margin: 20px 0;
	font-size: 20px;
	font-weight: 400;
	text-align: justify;
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
