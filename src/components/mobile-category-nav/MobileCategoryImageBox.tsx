import { Typography } from '@mui/material'
import { FlexRowCenter } from 'src/components/flex-box'
import LazyImage from 'src/components/LazyImage'
import { FC } from 'react'
import { ICategory } from 'src/shared/types/product.types'

const MobileCategoryImageBox: FC<ICategory> = ({
	id,
	name,
	image,
	slug,
	icon,
	description,
}) => {
	return (
		<FlexRowCenter flexDirection="column">
			<LazyImage
				src={image}
				borderRadius="5px"
				width={120}
				height={100}
				objectFit="cover"
			/>
			<Typography
				className="ellipsis"
				textAlign="center"
				fontSize="11px"
				lineHeight="1"
				mt={1}
			>
				{name}
			</Typography>
		</FlexRowCenter>
	)
}

export default MobileCategoryImageBox
