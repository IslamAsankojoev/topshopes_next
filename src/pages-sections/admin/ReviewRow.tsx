import { Delete } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { Paragraph, Small } from 'src/components/Typography'
import { FlexBox } from 'src/components/flex-box'
import { FC } from 'react'

import {
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from './StyledComponents'

// ========================================================================
type ReviewRowProps = { review: any }
// ========================================================================

const ReviewRow: FC<ReviewRowProps> = ({ review }) => {
	const { customer, name, image, comment, published } = review

	return (
		<StyledTableRow tabIndex={-1} role="checkbox">
			<StyledTableCell align="left">
				<FlexBox alignItems="center" gap={1.5}>
					<Avatar src={image} sx={{ borderRadius: '8px' }} />
					<Paragraph>{name}</Paragraph>
				</FlexBox>
			</StyledTableCell>

			<StyledTableCell align="left">{customer}</StyledTableCell>

			<StyledTableCell align="left">
				<Small>{comment}</Small>
			</StyledTableCell>

			<StyledTableCell align="center">
				<StyledIconButton>
					<Delete color="error" />
				</StyledIconButton>
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default ReviewRow
