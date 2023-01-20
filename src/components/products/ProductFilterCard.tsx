import {
	Box,
	Card,
	Checkbox,
	Divider,
	FormControlLabel,
	Link,
	Rating,
	TextField,
} from '@mui/material'
import { BrandsService } from 'api/services/brands/brand.service'
import { CategoriesService } from 'api/services/categories/category.service'
import { H5, H6, Paragraph, Span } from 'components/Typography'
import Accordion from 'components/accordion/Accordion'
import AccordionHeader from 'components/accordion/AccordionHeader'
import { FlexBetween, FlexBox } from 'components/flex-box'
import { categories } from 'fake-db/server/dashboard/categories'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { IBrand, ICategory } from 'shared/types/product.types'
import { ResponseList } from 'shared/types/response.types'
import { common } from 'utils/Translate/common'
import { dynamicLocalization } from 'utils/Translate/dynamicLocalization'

const ProductFilterCard = () => {
	const router = useRouter()

	const { t: commonT } = useTranslation('common')
	const { t: shopT } = useTranslation('shop')

	const { data: brandList } = useQuery(
		'brandList',
		() => BrandsService.getList(),
		{
			select: (data: ResponseList<IBrand>) => data.results,
		}
	)

	const { data: categroyList } = useQuery(
		'categroyList',
		() => CategoriesService.getList(),

		{
			select: (data: ResponseList<ICategory>) => data.results,
		}
	)

	return (
		<Card sx={{ p: '18px 27px', overflow: 'auto' }} elevation={1}>
			<H6 mb={1.25}>{commonT('categories')}</H6>

			{categroyList?.map((item) => (
				<Paragraph
					py={0.75}
					fontSize="16px"
					color="grey.800"
					key={item.name}
					className="cursor-pointer"
				>
					<Link
						href={`/shop/?category=${item.id}`}
						sx={{
							fontWeight: router.query.category === item.id ? '700' : '500',
							color:
								router.query.category === item.id ? 'primary.main' : 'inherit',
							textDecoration: 'none',

							'&:hover': {
								color: 'primary.main',
							},
						}}
					>
						{item.name}
					</Link>
				</Paragraph>
			))}

			<Divider sx={{ mt: 2, mb: 3 }} />

			<H6 mb={2}>{shopT('priceRange')}</H6>
			<FlexBetween>
				<TextField placeholder="0" type="number" size="small" fullWidth />
				<H5 color="grey.600" px={1}>
					-
				</H5>
				<TextField placeholder="250" type="number" size="small" fullWidth />
			</FlexBetween>

			<Divider sx={{ my: 3 }} />

			<H6 mb={2}>{shopT('brands')}</H6>
			{brandList?.map((item) => (
				<FormControlLabel
					key={item.id}
					sx={{ display: 'flex' }}
					label={<Span color="inherit">{item.name}</Span>}
					control={<Checkbox size="small" color="secondary" />}
				/>
			))}

			<Divider sx={{ my: 3 }} />

			{otherOptions?.map((item) => (
				<FormControlLabel
					key={item}
					sx={{ display: 'flex' }}
					label={<Span color="inherit">{item}</Span>}
					control={<Checkbox size="small" color="secondary" />}
				/>
			))}

			{/* <Divider sx={{ my: 3 }} />

      <H6 mb={2}>Ratings</H6>
      {[5, 4, 3, 2, 1]?.map((item) => (
        <FormControlLabel
          control={<Checkbox size="small" color="secondary" />}
          label={<Rating size="small" value={item} color="warn" readOnly />}
          sx={{ display: 'flex' }}
          key={item}
        />
      ))} */}

			{/* <Divider sx={{ my: 3 }} /> */}

			{/* <H6 mb={2}>Colors</H6>
      <FlexBox mb={2} flexWrap="wrap" gap={1}>
        {colorList?.map((item) => (
          <Box
            flexShrink={0}
            sx={{
              width: 25,
              height: 25,
              bgcolor: item,
              cursor: "pointer",
              borderRadius: "50%",
            }}
            key={item}
          />
        ))}
      </FlexBox> */}
		</Card>
	)
}

// const categroyList = [
// 	{
// 		title: 'Bath Preparations',
// 		subCategories: ['Bubble Bath', 'Bath Capsules', 'Others'],
// 	},
// 	{ title: 'Eye Makeup Preparations' },
// 	{ title: 'Fragrance' },
// 	{ title: 'Hair Preparations' },
// ]

// const brandList = ['Maccs', 'Karts', 'Baars', 'Bukks', 'Luasis']
const otherOptions = ['On Sale', 'In Stock', 'Featured']
const colorList = [
	'#1C1C1C',
	'#FF7A7A',
	'#FFC672',
	'#84FFB5',
	'#70F6FF',
	'#6B7AFF',
]

export default ProductFilterCard
