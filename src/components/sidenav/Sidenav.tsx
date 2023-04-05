import { Box, Drawer, styled, Tooltip } from '@mui/material'
import clsx from 'clsx'
import Scrollbar from 'src/components/Scrollbar'
import { FC, cloneElement, useEffect, useState, ReactElement } from 'react'
import Toggle from '../icons/Toggle'

// styled component
const Wrapper = styled(Box)(() => ({ '& .handle': { cursor: 'pointer' } }))

// ================================================================
type SidenavProps = {
	open?: boolean
	width?: number
	handle: ReactElement
	toggleSidenav?: () => void
	position?: 'left' | 'right'
}
// ================================================================

const Sidenav: FC<SidenavProps> = (props) => {
	// props list
	const { position, open, width = 280, handle, children, toggleSidenav } = props
	// state
	const [sidenavOpen, setSidenavOpen] = useState(open)
	const handleToggleSidenav = () => setSidenavOpen(!sidenavOpen)

	useEffect(() => setSidenavOpen(open), [open])

	return (
		<Wrapper>
			<Drawer
				anchor={position}
				open={sidenavOpen}
				onClose={toggleSidenav || handleToggleSidenav}
				SlideProps={{ style: { width } }}
				sx={{ zIndex: 15001 }}
			>
				<Scrollbar autoHide={false}>{children}</Scrollbar>
			</Drawer>
			{handle &&
				cloneElement(handle, {
					onClick: toggleSidenav || handleToggleSidenav,
					className: clsx(handle.props?.className, 'handle'),
				})}
		</Wrapper>
	)
}

// set default component props
Sidenav.defaultProps = { width: 280, position: 'left', open: false }

export default Sidenav
