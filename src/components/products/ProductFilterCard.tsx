import {
	Card,
	Checkbox,
	Divider,
	FormControlLabel,
	Link,
	TextField,
} from '@mui/material'
import { BrandsService } from 'src/api/services/brands/brand.service'
import { CategoriesService } from 'src/api/services/categories/category.service'
import { H5, H6, Paragraph, Span } from 'src/components/Typography'
import { FlexBetween } from 'src/components/flex-box'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { IBrand, ICategory } from 'src/shared/types/product.types'
import { ResponseList } from 'src/shared/types/response.types'
import { useEffect, useState } from 'react'
import lodash from 'lodash'

const ProductFilterCard = () => {
	const router = useRouter()

	const { t: commonT } = useTranslation('common')
	const { t: shopT } = useTranslation('shop')

	const [isMounted, setIsMounted] = useState(false)
	const [preMaxPrice, setPreMaxPrice] = useState('')
	const [preMinPrice, setPreMinPrice] = useState('')

	const [maxPrice, setMaxPrice] = useState('')
	const [minPrice, setMinPrice] = useState('')
	const [category, setCategory] = useState('')
	const [brands, setBrands] = useState([])

	const { data: brandList } = useQuery(
		'brandList',
		() => BrandsService.getList(),
		{
			select: (data: ResponseList<IBrand>) => data.results,
		}
	)

	const { data: categroyList } = useQuery(
		'categories',
		() => CategoriesService.getList(),
		{
			select: (data: ResponseList<ICategory>) => data.results,
			staleTime: 1000 * 60 * 10,
		}
	)

	const handleCategoryChange = (CategoryId: string) => {
		setCategory(CategoryId)
	}

	const handleBrandChange = (checked: boolean, BrandName: string) => {
		if (checked) {
			setBrands((prev) => [...prev, BrandName])
			return null
		}
		setBrands((prev) => prev.filter((item) => item !== BrandName))
	}

	const handlePriceChange = (e) => {
		const { name, value } = e.target
		if (name === 'maxPrice') {
			setMaxPrice(value)
		}
		if (name === 'minPrice') {
			setMinPrice(value)
		}
	}

	const debouncedHandlePriceChange = lodash.debounce(handlePriceChange, 1000)

	const handlePriceValueChange = (e) => {
		const { name, value } = e.target
		if (name === 'maxPrice') {
			setPreMaxPrice(value)
		}
		if (name === 'minPrice') {
			setPreMinPrice(value)
		}
		debouncedHandlePriceChange(e)
	}

	useEffect(() => {
		if (isMounted) {
			router.push(
				{
					pathname: '/shop/',
					query: {
						max_price: maxPrice,
						min_price: minPrice,
						category,
						brand: brands.join(','),
					},
				},
				undefined,
				{ scroll: false }
			)
		} else {
			setIsMounted(true)
		}
	}, [maxPrice, minPrice, category, brands])

	useEffect(() => {
		if (router.query.maxPrice) {
			setMaxPrice(router.query.maxPrice as string)
		}
		if (router.query.minPrice) {
			setMinPrice(router.query.minPrice as string)
		}
		if (router.query.category) {
			setCategory(router.query.category as string)
		}
		if (router.query.brand) {
			setBrands((router.query.brand as string).split(','))
		}
	}, [])

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
						href={null}
						onClick={() => handleCategoryChange(item.id)}
						sx={{
							fontWeight: router.query.category === item.id ? '700' : '500',
							color:
								router.query.category === item.id ? 'primary.main' : 'inherit',
							textDecoration: 'none',
							cursor: 'pointer',
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
				<TextField
					name="minPrice"
					placeholder="0"
					type="number"
					size="small"
					value={preMinPrice}
					fullWidth
					onChange={(e) => handlePriceValueChange(e)}
				/>
				<H5 color="grey.600" px={1}>
					-
				</H5>
				<TextField
					name="maxPrice"
					placeholder="250"
					type="number"
					size="small"
					value={preMaxPrice}
					fullWidth
					onChange={(e) => handlePriceValueChange(e)}
				/>
			</FlexBetween>

			<Divider sx={{ my: 3 }} />

			<H6 mb={2}>{shopT('brands')}</H6>
			{brandList?.map((item) => (
				<FormControlLabel
					onChange={(e: any) => handleBrandChange(e.target.checked, item.name)}
					key={item.id}
					sx={{ display: 'flex' }}
					label={<Span color="inherit">{item.name}</Span>}
					control={
						<Checkbox
							defaultChecked={brands.includes(item.name)}
							size="small"
							color="secondary"
						/>
					}
				/>
			))}

			<Divider sx={{ my: 3 }} />
			{/* 
			{otherOptions?.map((item) => (
				<FormControlLabel
					key={item}
					sx={{ display: 'flex' }}
					label={<Span color="inherit">{item}</Span>}
					control={<Checkbox size="small" color="secondary" />}
				/>
			))} */}

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
