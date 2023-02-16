import { Card, CardProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import { FC } from 'react'


type BazaarCardProps = {
	hoverEffect?: boolean
}

const BazaarCard = styled<FC<BazaarCardProps & CardProps>>(
	({ hoverEffect, children, ...rest }) => <Card {...rest}>{children}</Card>
)<BazaarCardProps>(({ theme, hoverEffect }) => ({
	borderRadius: '8px',
	overflow: 'unset',
	transition: 'all 250ms ease-in-out',
	'&:hover': { boxShadow: hoverEffect ? theme.shadows[3] : '' },
}))

BazaarCard.defaultProps = { hoverEffect: false }

export default BazaarCard
