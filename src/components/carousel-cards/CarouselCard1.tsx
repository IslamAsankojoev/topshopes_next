import { Box, Grid, styled } from '@mui/material'
import LazyImage from 'src/components/LazyImage'
import { FlexBetween } from 'src/components/flex-box'
import { FC } from 'react'
import Link from 'next/link'
import { useAutoAnimate } from '@formkit/auto-animate/react'

// styled component
const StyledBox = styled(FlexBetween)(({ theme }) => ({
	'.title': {
		fontSize: 50,
		marginTop: 0,
		lineHeight: 1.2,
		marginBottom: '1.35rem',
	},
	[theme.breakpoints.up('sm')]: {
		'.grid-item': {
			minHeight: 424,
			display: 'flex',
			alignItems: 'baseline',
			flexDirection: 'column',
			justifyContent: 'center',
		},
	},
	[theme.breakpoints.down('sm')]: {
		marginLeft: 0,
		paddingLeft: 0,
		'.title': { fontSize: 32 },
	},
	[theme.breakpoints.down('xs')]: {
		'.title': { fontSize: 16 },
		'.title + *': { fontSize: 13 },
		'.button-link': { height: 36, padding: '0 1.5rem', fontSize: 13 },
	},
}))

// ==================================================
type CarouselCard1Props = {
	imgUrl?: string
	shop_id
}
// ==================================================

const CarouselCard1: FC<CarouselCard1Props> = ({ imgUrl, shop_id }) => {
	return (
		<StyledBox>
			<Grid container spacing={3} alignItems="center" justifyContent="center">
				{/* <Grid item className="grid-item" sm={5} xs={12}>
					<h1 className="title">{title}</h1>
					<Paragraph color="secondary.main" mb={2.7}>
						{description}
					</Paragraph>
					{buttonLik ? (
						<a href={buttonLik}>
							<Button
								size="large"
								color={buttonColor}
								disableElevation
								variant="contained"
								className="button-link"
								sx={{ height: 44, borderRadius: '4px' }}
							>
								{buttonText}
							</Button>
						</a>
					) : null}
				</Grid>

				<Grid item sm={5} xs={12}>
					<BazaarImage
						alt="apple-watch-1"
						src={imgUrl}
						sx={{
							mx: 'auto',
							maxHeight: 400,
							display: 'block',
							maxWidth: '100%',
						}}
					/>
				</Grid> */}
				<Link href={`/shops/${shop_id}/`}>
					<a
						style={{
							cursor: 'pointer',
						}}
					>
						<Box
							sx={{
								width: '100%',
								height: '365px',
								'@media (max-width: 991px)': {
									height: '70vw',
								},
							}}
						>
							<LazyImage
								src={imgUrl}
								layout="fill"
								alt="Slide"
								objectFit="cover"
							/>
						</Box>
					</a>
				</Link>
			</Grid>
		</StyledBox>
	)
}
export default CarouselCard1

// static text
const text = {
	title: {
		en: 'The best way to buy and sell online',
		ru: 'Лучший способ купить и продать онлайн',
		tr: 'En iyi  online alışveriş sitesi',
		kg: 'Самый лучший способ купить и продать онлайн',
		pl: 'Najlepszy sposób na kupowanie i sprzedawanie online',
	},
	info: {
		description: {
			en: 'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.',
			ru: 'Это простой герой, простой компонент стиля jumbotron для вызова дополнительного внимания к рекомендуемому контенту или информации.',
			tr: 'Bu basit bir kahraman birimi, öne çıkan içeriğe veya bilgiye ekstra dikkat çekmek için basit bir jumbotron tarzı bileşendir.',
			kg: 'Бул жакшы башкы бирлек, башкы бирлектингизге же маалыматга көбүрөөк байланышты көрсөтүү үчүн жакшы жеткиликтүү jumbotron стилдүү компонент.',
			pl: 'To jest prosty bohater, prosty komponent stylu jumbotron do wezwanie dodatkowej uwagi do wybranej zawartości lub informacji.',
		},
	},
}
