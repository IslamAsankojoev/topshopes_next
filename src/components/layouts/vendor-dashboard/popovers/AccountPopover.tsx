import { Avatar, Box, IconButton, Menu, MenuItem, styled } from '@mui/material'
import { H6, Small } from 'src/components/Typography'
import { useActions } from 'src/hooks/useActions'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { signOut } from 'next-auth/react'

// styled components
const Divider = styled(Box)(({ theme }) => ({
	margin: '0.5rem 0',
	border: `1px dashed ${theme.palette.grey[200]}`,
}))

const AccountPopover = () => {
	const { t } = useTranslation('admin')
	const user = useTypedSelector((state) => state.userStore.user)
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const { push } = useRouter()
	const { logout } = useActions()

	const handleClose = () => setAnchorEl(null)

	const handleClick = (event) => setAnchorEl(event.currentTarget)

	const handleLogout = async () => {
		logout()
	}

	return (
		user && (
			<Box>
				<IconButton
					sx={{ padding: 0 }}
					aria-haspopup="true"
					onClick={handleClick}
					aria-expanded={open ? 'true' : undefined}
					aria-controls={open ? 'account-menu' : undefined}
				>
					<Avatar
						alt="Avatar"
						src={user?.avatar || '/assets/images/avatars/001-man.svg'}
					/>
				</IconButton>

				<Menu
					open={open}
					id="account-menu"
					anchorEl={anchorEl}
					onClose={handleClose}
					onClick={handleClose}
					PaperProps={{
						elevation: 0,
						sx: {
							mt: 1,
							boxShadow: 2,
							minWidth: 200,
							borderRadius: '8px',
							overflow: 'visible',
							border: '1px solid',
							borderColor: 'grey.200',
							'& .MuiMenuItem-root:hover': {
								backgroundColor: 'grey.200',
							},
							'&:before': {
								top: 0,
								right: 14,
								zIndex: 0,
								width: 10,
								height: 10,
								content: '""',
								display: 'block',
								position: 'absolute',
								borderTop: '1px solid',
								borderLeft: '1px solid',
								borderColor: 'grey.200',
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
							},
						},
					}}
					transformOrigin={{ horizontal: 'right', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				>
					{/* <Box px={2} pt={1}>
          <H6>Gage Paquette</H6>
          <Small color="grey.500">Admin</Small>
        </Box> */}

					{/* <Divider /> */}
					<MenuItem
						onClick={() => {
							push('/profile')
						}}
					>
						{t('profile')}
					</MenuItem>
					<MenuItem
						onClick={() => {
							push('/orders')
						}}
					>
						{t('myOrders')}
					</MenuItem>
					<MenuItem
						onClick={() => {
							push('/profile/edit')
						}}
					>
						{t('settings')}
					</MenuItem>

					<Divider />
					<MenuItem onClick={handleLogout}>{t('logout')}</MenuItem>
				</Menu>
			</Box>
		)
	)
}

export default AccountPopover
