import styled from '@emotion/styled'
import { Box } from '@mui/material'
import Image from 'next/image'
import { FC } from 'react'

import { dynamicLocalization } from 'src/utils/Translate/dynamicLocalization'

import { H2 } from './Typography'

interface EmptyProps {
	children?: any
}

const Empty: FC<EmptyProps> = ({ children }) => {
	return (
		<Wrapper>
			{/* <Content> */}
			<Box
				sx={{
					minHeight: '60vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					rowGap: '20px',
				}}
			>
				<img
					src={'/assets/images/empty-box.webp'}
					alt={'empty'}
					style={{ maxWidth: children ? '200px' : '300px' }}
				/>
				{children}
			</Box>

			{/* <H2>{dynamicLocalization(translations.empty)}</H2> */}
			{/* </Content> */}
		</Wrapper>
	)
}

const translations = {
	empty: {
		en: 'Nothing found...',
		ru: 'Ничего не найдено...',
		tr: 'Hiçbirşey Bulunamadı...',
		kz: 'Ештеңе табылмады...',
		kg: 'Эч нерсе табылган жок...',
	},
}

const Wrapper = styled.div`
	width: 100%;
	height: 100%;

	padding: 30px 0;

	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;

	h2 {
		color: #2b3445;
		margin: 20px 0;
		text-align: center;
	}

	img {
		opacity: 0.8;
	}
`

// const Content = styled.div`
// 	display: flex;
// 	align-items: center;
// 	flex-direction: column;
// 	justify-content: center;

// 	padding: 20px;
// 	border-radius: 10px;
// 	border: 2px solid;
// `

export default Empty
