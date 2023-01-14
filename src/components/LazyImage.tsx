import {
	BordersProps,
	SpacingProps,
	bgcolor,
	borderRadius,
	compose,
	spacing,
	styled,
} from '@mui/system'
import NextImage, { ImageProps } from 'next/image'
import React, { useEffect } from 'react'

const checkDomen = (url: string) => {
	return url?.startsWith('http' || 'https')
		? url
		: `${process.env.SERVER_URL}/media/${url}/`
}

const LazyImage = styled<React.FC<ImageProps & BordersProps & SpacingProps>>(
	({ loader, borderRadius, src, ...rest }) => (
		<NextImage
			src={checkDomen(src as string)}
			loader={() => checkDomen(src as string)}
			{...rest}
		/>
	)
)(compose(spacing, borderRadius, bgcolor))

export default LazyImage
