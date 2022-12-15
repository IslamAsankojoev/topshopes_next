import React, { ComponentPropsWithoutRef } from 'react'
import * as icons from 'react-icons/fa'

type TypeIcon = keyof typeof icons

interface IconProps extends ComponentPropsWithoutRef<'image'> {
	iconName: TypeIcon
	size?: string
	color?: string
}

// В iconName можно передать название любых иконок из FontAwesome
const MyIcons: React.FC<IconProps> = (props) => {
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
