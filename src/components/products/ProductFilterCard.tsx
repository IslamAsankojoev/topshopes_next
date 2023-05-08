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
import debounce from 'lodash-es/debounce'

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
		() => BrandsService.getList({ page_size: 100 }),
		{
			select: (data: ResponseList<IBrand>) => data.results,
		}
	)

	const { data: categroyList } = useQuery(
		'categories',
		() => CategoriesService.getList({ page_size: 100 }),
		{
			select: (data: ResponseList<ICategory>) => data.results,
			staleTime: 1000 * 60 * 10,
			cacheTime: 1000 * 60 * 10,
		}
	)

	const handleCategoryChange = (CategoryName: string) => {
		setCategory(CategoryName)
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

	const debouncedHandlePriceChange = debounce(handlePriceChange, 1000)

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
		const clearPath = router.asPath.split('?')[0]

		if (isMounted) {
			router.push(
				{
					pathname: clearPath,
					query: {
						max_price: maxPrice,
						min_price: minPrice,
						category,
						brand: brands,
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
		// if (router.query?.brand?.length > 0) {
		// 	setBrands((prev) => [...prev, ...router.query.brand])
		// }
	}, [router.asPath])

	return (
		<Card sx={{ p: '18px 27px', overflow: 'auto' }} elevation={1}>
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
			<H6 mb={1.25}>{commonT('categories')}</H6>

			<Paragraph
				py={0.75}
				fontSize="16px"
				color="grey.800"
				className="cursor-pointer"
			>
				<Link
					href={null}
					onClick={() => handleCategoryChange('')}
					sx={{
						fontWeight: router.query.category === '' ? '700' : '500',
						color: router.query.category === '' ? 'primary.main' : 'inherit',
						textDecoration: 'none',
						cursor: 'pointer',
						'&:hover': {
							color: 'primary.main',
						},
					}}
				>
					Все
				</Link>
			</Paragraph>
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
						onClick={() => handleCategoryChange(item.name)}
						sx={{
							fontWeight: router.query.category === item.name ? '700' : '500',
							color:
								router.query.category === item.name
									? 'primary.main'
									: 'inherit',
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

			<H6 mb={2}>{shopT('brands')}</H6>
			<span
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'center',
					width: '100%',
					gap: '0.6rem',
				}}
			>
				{brandList?.map((item) => (
					<FormControlLabel
						onChange={(e: any) =>
							handleBrandChange(e.target.checked, item.name)
						}
						key={item.id}
						sx={{
							display: 'flex',
							margin: '0',
							'& .MuiButtonBase-root': {
								display: 'none',
							},
							'& .MuiTypography-root': {
								padding: '0.20rem 0.45rem',
								borderRadius: '0.25rem',
								backgroundColor: 'grey.200',
							},
							'& .Mui-checked + .MuiTypography-root': {
								backgroundColor: 'secondary.main',
								color: 'white',
							},
						}}
						label={<Span color="inherit">{item.name}</Span>}
						control={
							<Checkbox
								size="small"
								color="secondary"
								defaultChecked={router?.query?.brand?.includes(item.name)}
							/>
						}
					/>
				))}
			</span>

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
