import React from 'react'
import * as icons from 'react-icons/fa'

type TypeIcon = keyof typeof icons

const MyIcons: React.FC<{
	iconName: TypeIcon
	size?: string
	color?: string
}> = (props) => {
	const { iconName, size, color, ...other } = props
	const Icon = icons[iconName]
	return (
		<Icon
			{...other}
			style={{ fontSize: size || '20px', color: color || 'gray' }}
		/>
	)
}

export default MyIcons
