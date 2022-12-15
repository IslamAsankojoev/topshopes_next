import React from 'react'
import { Tooltip } from '@mui/material'
import styled from '@emotion/styled'
import { CategoryWrapper } from '../../pages-sections/admin'

const TooltipList = (props) => {
	const { list, children } = props

	return (
		<Tooltip
			title={
				list?.length > 1 ? (
					<TooltipWrapper>
						<ul>
							{list?.map((li) => (
								<CategoryWrapper
									sx={{ fontSize: '10px' }}
									key={li + '-tooltip'}
								>
									{li}
								</CategoryWrapper>
							))}
						</ul>
					</TooltipWrapper>
				) : (
					''
				)
			}
		>
			{children}
		</Tooltip>
	)
}

const TooltipWrapper = styled.div`
	display: grid;
	justify-content: start;
	align-items: center;

	padding: 15px 0px;

	ul {
		padding-left: calc(1.2rem + 0.9vw);
		display: flex;
		flex-wrap: wrap;
		grid-gap: 10px;
	}
`

export default TooltipList
