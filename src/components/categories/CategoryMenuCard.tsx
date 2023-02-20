import { Box, Link, MenuItem, styled } from '@mui/material'
import { CategoriesService } from 'src/api/services/categories/category.service'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { ICategory } from 'src/shared/types/product.types'
import { ResponseList } from 'src/shared/types/response.types'

import MegaMenu1 from './mega-menu/MegaMenu1'
import MegaMenu2 from './mega-menu/MegaMenu2'

// styled component
const Wrapper = styled(Box)<CategoryMenuCardProps>(
	({ theme, position, open }) => ({
		left: 0,
		zIndex: 98,
		right: 'auto',
		borderRadius: 4,
		padding: '0.5rem 0px',
		transformOrigin: 'top',
		boxShadow: theme.shadows[2],
		position: position || 'unset',
		transition: 'all 250ms ease-in-out',
		transform: open ? 'scaleY(1)' : 'scaleY(0)',
		backgroundColor: theme.palette.background.paper,
		top: position === 'absolute' ? 'calc(100% + 0.7rem)' : '0.5rem',
	})
)

// ===============================================================
type CategoryMenuCardProps = {
	open?: boolean
	position?: 'absolute' | 'relative'
}
// ===============================================================

const CategoryMenuCard: FC<CategoryMenuCardProps> = (props) => {
	const { open, position } = props

	const { data: categories = [] } = useQuery(
		'categories',
		() => CategoriesService.getList(),
		{
			select: (data: ResponseList<ICategory>) => data.results,
			staleTime: 1000 * 60 * 10,
		},
	)

	const megaMenu: any = { MegaMenu1, MegaMenu2 }

	return (
		<Wrapper open={open} position={position} style={{
			minWidth: '100%',
		}}>
			{categories?.map((item) => {
				return (
					<MenuItem>
						<Link
							href={`/shop/?category=${item.id}`}
							style={{
								width: '100%',
								color: 'black',
								textDecoration: 'none',
								fontSize: '16px',
								fontWeight: 400,
							}}
							key={item.id}
						>
							{item.name} 
						</Link>
					</MenuItem>
				)
				// let MegaMenu = megaMenu[item.menuComponent]
				// return (
				// 	<CategoryMenuItem
				// 		key={item.name}
				// 		href={item.id}
				// 		icon={item.icon}
				// 		title={item.name}
				// 		caret={false}
				// 	>
				// 		{/* <MegaMenu data={{}} /> */}
				// 	</CategoryMenuItem>
				// )
			})}
		</Wrapper>
	)
}

CategoryMenuCard.defaultProps = { position: 'absolute' }

export default CategoryMenuCard
