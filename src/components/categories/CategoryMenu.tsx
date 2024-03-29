/* eslint-disable react-hooks/exhaustive-deps */
import { Box, styled } from '@mui/material'
import { cloneElement, FC, ReactElement, useEffect, useRef, useState, MouseEvent } from 'react'

import CategoryMenuCard from './CategoryMenuCard'

// styled component
const Wrapper = styled(Box)<{ open: boolean }>(
	({ open, theme: { direction } }) => ({
		cursor: 'pointer',
		position: 'relative',
		'& .dropdown-icon': {
			transition: 'all 250ms ease-in-out',
			transform: `rotate(${
				open ? (direction === 'rtl' ? '-90deg' : '90deg') : '0deg'
			})`,
		},
	})
)

// ===========================================================
type CategoryMenuProps = {
	open?: boolean
	children: ReactElement
}
// ===========================================================

const CategoryMenu: FC<CategoryMenuProps> = ({
	open: isOpen = false,
	children,
}) => {
	const [open, setOpen] = useState(isOpen)
	const popoverRef = useRef(open)
	popoverRef.current = open

	const toggleMenu = (e: MouseEvent<Document, MouseEvent>) => {
		e.stopPropagation()
		if (!isOpen) setOpen((open) => !open)
	}

	const handleDocumentClick = () => {
		if (popoverRef.current && !isOpen) setOpen(false)
	}

	useEffect(() => {
		window.addEventListener('click', handleDocumentClick)

		return () => window.removeEventListener('click', handleDocumentClick)
	}, [])

	return (
		<Wrapper open={open}>
			{cloneElement(children, {
				open,
				onClick: toggleMenu,
				className: `${children.props.className}`,
			})}

			<CategoryMenuCard open={open} />
		</Wrapper>
	)
}

export default CategoryMenu
