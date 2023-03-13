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
import { FC } from 'react'

export const checkDomen = (url: string) => {
	if (url?.startsWith('blob')) return url
	if (url?.startsWith('/assets')) return url
	if(url?.startsWith('/media')) return `${process.env.SERVER_URL}${url}`
	if (url?.startsWith('http:')) return url.replace('http:', 'https:')
	return url?.startsWith('https')
		? url
		: `${process.env.SERVER_URL}/media/${url}`
	
}

const LazyImage = styled<FC<ImageProps & BordersProps & SpacingProps>>(
	({ loader, borderRadius, src, objectFit = 'contain', ...rest }) => {
		return (
			<NextImage
				objectFit={objectFit}
				src={checkDomen(src as string)}
				loader={() => checkDomen(src as string)}
				{...rest}
			/>
		)
	}
)(compose(spacing, borderRadius, bgcolor))

export default LazyImage
