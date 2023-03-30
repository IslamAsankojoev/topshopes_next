import { Box, Divider, Grid, Typography } from '@mui/material'
import Accordion from 'src/components/accordion/Accordion'
import AccordionHeader from 'src/components/accordion/AccordionHeader'
import Header from 'src/components/header/Header'
import MobileCategoryImageBox from 'src/components/mobile-category-nav/MobileCategoryImageBox'
import MobileCategoryNavStyle from 'src/components/mobile-category-nav/MobileCategoryNavStyle'
import MobileNavigationBar from 'src/components/mobile-navigation/MobileNavigationBar'
import navigations from 'src/data/navigations'
import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import { localize } from 'src/utils/Translate/localize'
import { useQuery } from 'react-query'
import axios from 'axios'
import { CategoriesService } from 'src/api/services/categories/category.service'
import { ICategory } from 'src/shared/types/product.types'
import { ResponseList } from 'src/shared/types/response.types'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}

const MobileCategoryNav: NextPage = () => {
	const { data: category } = useQuery(
		'category page list',
		() => CategoriesService.getList({ limit: 1000 }),
		{
			select: (data: ResponseList<ICategory>) => data.results,
		}
	)

	// const handleCategoryClick = (cat: any) => () => {
	// 	let menuData = cat.menuData
	// 	if (menuData) setSubCategoryList(menuData.categories || menuData)
	// 	else setSubCategoryList([])

	// 	setCategory(cat)
	// }

	return (
		<MobileCategoryNavStyle>
			<Header className="header" />

			{/* <Box className="main-category-holder">
				{navigations?.map((item) => (
					<Box
						key={item.title}
						className="main-category-box"
						onClick={handleCategoryClick(item)}
						borderLeft={`${category?.href === item.href ? '3' : '0'}px solid`}
					>
						<item.icon sx={{ fontSize: '28px', mb: '0.5rem' }} />
						<Typography
							className="ellipsis"
							textAlign="center"
							fontSize="11px"
							lineHeight="1"
						>
							{item.title}
						</Typography>
					</Box>
				))}
			</Box> */}

			<Box className="container">
				<Typography fontWeight="600" fontSize="15px" mb={2}>
					{localize({
						en: 'Categories',
						ru: 'Категории',
						kz: 'Категориялар',
						kg: 'Категориялар',
						tr: 'Kategoriler',
					})}
				</Typography>

				<Box mb={4}>
					<Grid container rowGap={2}>
						{category?.map((item) => (
							<Grid item lg={1} md={2} sm={3} xs={4} key={item.id}>
								<Link href={`/shop/?category=${item.name}`}>
									<a>
										<MobileCategoryImageBox {...item} />
									</a>
								</Link>
							</Grid>
						))}
					</Grid>
				</Box>
			</Box>

			<MobileNavigationBar />
		</MobileCategoryNavStyle>
	)
}

export default MobileCategoryNav
