import { Avatar, Typography } from '@mui/material'
import { FlexBox } from 'src/components/flex-box'
import { FC } from 'react'

type HeadingProps = { number: number; title: string }

const Heading: FC<HeadingProps> = ({ number, title }) => {
	return (
		<FlexBox gap={1.5} alignItems="center" mb={3.5}>
			<Avatar
				sx={{
					width: 32,
					height: 32,
					color: 'primary.text',
					backgroundColor: 'primary.main',
				}}
			>
				{number}
			</Avatar>
			<Typography fontSize="20px">{title}</Typography>
		</FlexBox>
	)
}

export default Heading
