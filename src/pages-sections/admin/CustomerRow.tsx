import { Delete, Edit } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { Paragraph } from 'src/components/Typography'
import { FlexBox } from 'src/components/flex-box'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { IUser } from 'src/shared/types/user.types'

import {
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from './StyledComponents'
import { api_admin } from 'src/api/index.service'

// ========================================================================
type CustomerRowProps = { customer: IUser; refetch: () => void }
// ========================================================================

const CustomerRow: FC<CustomerRowProps> = ({ customer, refetch }) => {
	const { avatar, email, first_name, last_name, phone, verified, id } = customer

	const { push } = useRouter()

	const nameFiller = first_name ? first_name : email.split('@')[0]

	//handlers
	const onDelete = async () => {
		if (window.confirm('Are you sure?')) {
			await api_admin.users.UsersService.delete(id)
			refetch()
		}
	}

	const handleEdit = () => {
		push(`customers/${id}`)
	}

	return customer ? (
		<StyledTableRow
			tabIndex={-1}
			role="checkbox"
			sx={{
				cursor: 'pointer',
				transition: 'all 0.2s ease-in-out',
				'&:hover': {
					backgroundColor: 'grey.200',
				},
			}}
			onClick={handleEdit}
		>
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

			{/* <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
				{currency(balance, { separator: ',' }).format()}
			</StyledTableCell> */}

			<StyledTableCell align="center">
				{/* <StyledIconButton
					onClick={() => {
						push(`customers/${id}`)
					}}
				>
					<Edit />
				</StyledIconButton> */}

				<StyledIconButton onClick={onDelete}>
					<Delete color="error" />
				</StyledIconButton>
			</StyledTableCell>
		</StyledTableRow>
	) : null
}

export default CustomerRow
