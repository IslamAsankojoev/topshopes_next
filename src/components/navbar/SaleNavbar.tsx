/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, styled } from '@mui/material'
import Scrollbar from 'src/components/Scrollbar'
import { FlexRowCenter } from 'src/components/flex-box'
import { FC, useCallback, useState } from 'react'

import { H5 } from '../Typography'

// ==========================================================================
type SaleNavbarProps = {
	onChange?: (value: any) => void
	saleCategoryList: { icon: any; title: string }[]
}
// ==========================================================================

// styled compoentents
const StyledScrollbar = styled(Scrollbar)(() => ({
	'& .simplebar-content': {
		height: '5rem',
		display: 'flex',
		backgroundColor: 'white',
		justifyContent: 'center',
	},
}))

const Title = styled(H5)<{ selected: any }>(({ selected, theme }) => ({
	fontSize: '12px',
	textAlign: 'center',
	fontWeight: selected ? '600' : '400',
	color: selected ? theme.palette.primary.main : 'inherit',
}))

const SaleNavbar: FC<SaleNavbarProps> = ({ saleCategoryList, onChange }) => {
	const [selected, setSelected] = useState(1)

	const handleCategoryClick = useCallback(
		(categoryIndex) => () => {
			setSelected(categoryIndex)
			if (onChange) onChange(saleCategoryList[categoryIndex])
		},
		[]
	)

	return (
		<Box bgcolor="background.paper">
			<Container>
				<StyledScrollbar autoHide={false}>
					{saleCategoryList?.map((item, ind) => (
						<FlexRowCenter
							key={ind}
							onClick={handleCategoryClick(ind)}
							sx={{
								cursor: 'pointer',
								minWidth: '100px',
								flexDirection: 'column',
								background: ind === selected ? 'primary.light' : 'transparent',
							}}
						>
							<item.icon
								sx={{ fontSize: '1.75rem' }}
								color={ind === selected ? 'primary' : 'secondary'}
							/>
							<Title selected={ind === selected}>{item.title}</Title>
						</FlexRowCenter>
					))}
				</StyledScrollbar>
			</Container>
		</Box>
	)
}

export default SaleNavbar
