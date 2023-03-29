import { Avatar } from '@mui/material'
import { UsersService } from 'src/api/services-admin/users/users.service'
import { Paragraph } from 'src/components/Typography'
import { FlexBox } from 'src/components/flex-box'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { IUser } from 'src/shared/types/user.types'

import { StyledTableCell, StyledTableRow } from './StyledComponents'

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
		shop,
	} = customer

	const { push } = useRouter()

	const nameFiller = first_name ? first_name : email.split('@')[0]

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
				<FlexBox alignItems="center" gap={1.5} p={1}>
					<Avatar
						src={avatar || '/assets/images/avatars/001-man.svg'}
						sx={{}}
					/>
					<Paragraph>{email}</Paragraph>
				</FlexBox>
			</StyledTableCell>

			<StyledTableCell align="left" sx={{ fontWeight: 400 }}>
				{first_name || nameFiller}
			</StyledTableCell>

			<StyledTableCell align="left" sx={{ fontWeight: 400 }}>
				{phone}
			</StyledTableCell>

			<StyledTableCell align="left" sx={{ fontWeight: 400 }}>
				{shop?.name}
			</StyledTableCell>

			{/* <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
				{currency(balance, { separator: ',' }).format()}
			</StyledTableCell> */}
		</StyledTableRow>
	) : null
}

export default SellerRow
