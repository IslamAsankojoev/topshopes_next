
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
									sx={{ fontSize: '13px', fontWeight: '600' }}
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
	align-items: start;
	padding: 15px 8px;

	ul {
		display: flex;
		align-items: flex-start;
		grid-gap: 10px;
		flex-wrap: wrap;
	}
`

export default TooltipList
