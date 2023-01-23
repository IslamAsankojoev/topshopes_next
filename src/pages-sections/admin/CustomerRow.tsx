import { Delete, Edit } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { UsersService } from 'api/services-admin/users/users.service'
import BazaarSwitch from 'components/BazaarSwitch'
import { Paragraph } from 'components/Typography'
import { FlexBox } from 'components/flex-box'
import currency from 'currency.js'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { IUser } from 'shared/types/user.types'

import {
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from './StyledComponents'

// ========================================================================
type CustomerRowProps = { customer: IUser; refetch: () => void }
// ========================================================================

const CustomerRow: FC<CustomerRowProps> = ({ customer, refetch }) => {
	const { avatar, email, first_name, last_name, phone, verified, id } = customer

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

			{/* <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
				{currency(balance, { separator: ',' }).format()}
			</StyledTableCell> */}

			<StyledTableCell align="center">
				<StyledIconButton
					onClick={() => {
						push(`customers/${id}`)
					}}
				>
					<Edit />
				</StyledIconButton>

				<StyledIconButton onClick={onDelete}>
					<Delete />
				</StyledIconButton>
			</StyledTableCell>
		</StyledTableRow>
	) : null
}

export default CustomerRow
