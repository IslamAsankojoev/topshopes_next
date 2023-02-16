import { Avatar } from '@mui/material'
import { UsersService } from 'api/services-admin/users/users.service'
import { Paragraph } from 'components/Typography'
import { FlexBox } from 'components/flex-box'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { IUser } from 'shared/types/user.types'

import {
	StyledTableCell,
	StyledTableRow,
} from './StyledComponents'

// ========================================================================
type CustomerRowProps = { customer: IUser; refetch: () => void }
// ========================================================================

const SellerRow: FC<CustomerRowProps> = ({ customer, refetch }) => {
	const {
		avatar,
		email,
		first_name,
		last_name,
		phone,
		verified,
		id,
		is_seller,
	} = customer

	const { push } = useRouter()

	//handlers
	const onDelete = async () => {
		if (window.confirm('Are you sure?')) {
			try {
				await UsersService.delete(id)
				refetch()
			} catch (e: unknown) {
				console.log(e)
			}
		}
	}

	return customer ? (
		<StyledTableRow tabIndex={-1} role="checkbox">
			<StyledTableCell align="left">
				<FlexBox alignItems="center" gap={1.5}>
					<Avatar src={avatar} sx={{}} />
					<Paragraph>{first_name}</Paragraph>
				</FlexBox>
			</StyledTableCell>

			<StyledTableCell align="left" sx={{ fontWeight: 400 }}>
				{phone}
			</StyledTableCell>

			<StyledTableCell align="left" sx={{ fontWeight: 400 }}>
				{email}
			</StyledTableCell>

			<StyledTableCell align="left" sx={{ fontWeight: 400 }}>
				{is_seller}
			</StyledTableCell>

			{/* <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
				{currency(balance, { separator: ',' }).format()}
			</StyledTableCell> */}
		</StyledTableRow>
	) : null
}

export default SellerRow
