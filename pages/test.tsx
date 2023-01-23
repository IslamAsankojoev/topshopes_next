import { Button } from '@mui/material'
import ShopLayout1 from 'components/layouts/ShopLayout1'
import StringHTML from 'components/StringHTML/StringHTML'
import dynamic from 'next/dynamic'
import React from 'react'

const DynamicTextEditor = dynamic(
	() => import('components/TextEditor/TextEditor'),
	{ ssr: false }
)

const Test: React.FC = () => {
	const [text, setText] = React.useState('')

	const handleTextChange = (value) => {
		setText(value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(typeof text)
	}

	return (
		<ShopLayout1>
			<div
				style={{
					padding: '100px',
				}}
			>
				<DynamicTextEditor
					placeholder="Article Content"
					onChange={handleTextChange}
					value={text}
				/>
				{/* <Button variant="contained" color="dark" onClick={handleSubmit}>
					Submit
				</Button> */}

				<br />
				<br />

				<StringHTML>{text}</StringHTML>
			</div>
		</ShopLayout1>
	)
}

export default Test
