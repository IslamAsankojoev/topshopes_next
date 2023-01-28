/* eslint-disable react-hooks/exhaustive-deps */
import KeyboardArrowDownOutlined from '@mui/icons-material/KeyboardArrowDownOutlined'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { Box, Card, MenuItem, TextField } from '@mui/material'
import TouchRipple from '@mui/material/ButtonBase'
import { styled } from '@mui/material/styles'
import { debounce } from '@mui/material/utils'
import { CategoriesService } from 'api/services/categories/category.service'
import { ShopsProductsService } from 'api/services/shops-products/ShopsProducts.service'
import BazaarMenu from 'components/BazaarMenu'
import { FlexBox } from 'components/flex-box'
import useDebounce from 'hooks/useDebounce'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { ICategory, IProductPreview } from 'shared/types/product.types'
import { ResponseList } from 'shared/types/response.types'

// styled components
// also used in the GrocerySearchBox component
export const SearchOutlinedIcon = styled(SearchOutlined)(({ theme }) => ({
	color: theme.palette.grey[600],
	marginRight: 6,
}))

// also used in the GrocerySearchBox component
export const SearchResultCard = styled(Card)(() => ({
	zIndex: 99,
	top: '100%',
	width: '100%',
	position: 'absolute',
	paddingTop: '0.5rem',
	paddingBottom: '0.5rem',
}))

const DropDownHandler = styled(FlexBox)(({ theme }) => ({
	whiteSpace: 'pre',
	borderTopRightRadius: 300,
	borderBottomRightRadius: 300,
	borderLeft: `1px solid ${theme.palette.text.disabled}`,
	[theme.breakpoints.down('xs')]: { display: 'none' },
}))

const SearchBox: FC = () => {
	const { t } = useTranslation('common')

	const [category, setCategory] = useState({ id: '', name: t('allCategories') })

	const [resultList, setResultList] = useState([])
	const [search, setSearch] = useState<string>('')
	const debounceValue = useDebounce(search)

	const { data: products } = useQuery(
		[`search products search=${debounceValue}`],
		() => ShopsProductsService.getList({ search: debounceValue, page_size: 6 }),
		{
			enabled: !!search,
			select: (data: ResponseList<IProductPreview>) => data.results,
			onSuccess: (data) => setResultList(data || []),
		}
	)

	const parentRef = useRef()

	const { data: categories } = useQuery(
		'categories',
		() => CategoriesService.getList(),
		{
			select: (data: ResponseList<ICategory>) => [
				{ id: 'all', name: t('allCategories') },
				...data?.results,
			],
		}
	)

	const handleCategoryChange = (cat: any) => () => setCategory(cat)
	const hanldeSearch = ({ target }) => {
		setSearch(target.value)
	}

	const { push, query } = useRouter()

	const submitHandler = (e) => {
		e.preventDefault()
		push({
			pathname: '/shop',
			query: {
				search,
				page: 1,
				category: category.id,
			},
		})
	}

	const handleDocumentClick = () => setResultList([])
	useEffect(() => {
		window.addEventListener('click', handleDocumentClick)
		return () => window.removeEventListener('click', handleDocumentClick)
	}, [])

	const categoryDropdown = (
		<BazaarMenu
			direction="left"
			sx={{ zIndex: 1502 }}
			handler={
				<DropDownHandler
					px={3}
					gap={0.5}
					height="100%"
					color="grey.700"
					bgcolor="grey.100"
					alignItems="center"
					component={TouchRipple}
				>
					{category?.name}
					<KeyboardArrowDownOutlined fontSize="small" color="inherit" />
				</DropDownHandler>
			}
		>
			{categories?.map((item) => (
				<MenuItem key={item?.id} onClick={handleCategoryChange(item)}>
					{item?.name}
				</MenuItem>
			))}
		</BazaarMenu>
	)

	return (
		<Box
			position="relative"
			flex="1 1 0"
			maxWidth="670px"
			mx="auto"
			{...{ ref: parentRef }}
		>
			<form onSubmit={submitHandler}>
				<TextField
					fullWidth
					variant="outlined"
					placeholder={t('searchingFor')}
					value={search}
					onChange={hanldeSearch}
					InputProps={{
						sx: {
							height: 44,
							paddingRight: 0,
							borderRadius: 300,
							color: 'grey.700',
							overflow: 'hidden',
							'&:hover .MuiOutlinedInput-notchedOutline': {
								borderColor: 'primary.main',
							},
						},
						endAdornment: categoryDropdown,
						startAdornment: <SearchOutlinedIcon fontSize="small" />,
					}}
				/>

				{!!resultList?.length && (
					<SearchResultCard elevation={2}>
						{products?.map((item) => (
							<Link
								href={{
									pathname: `/product/[id]`,
									query: { trueID: item.id, id: item.slug },
								}}
								key={item.id}
								passHref
							>
								<MenuItem>{item.name}</MenuItem>
							</Link>
						))}
					</SearchResultCard>
				)}
			</form>
		</Box>
	)
}

const dummySearchResult = [
	'Macbook Air 13',
	'Asus K555LA',
	'Acer Aspire X453',
	'iPad Mini 3',
]

export default SearchBox
