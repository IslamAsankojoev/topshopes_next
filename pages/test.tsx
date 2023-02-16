import StringHTML from 'components/StringHTML/StringHTML'
import ShopLayout1 from 'components/layouts/ShopLayout1'
import dynamic from 'next/dynamic'
import { useState } from 'react'


const DynamicTextEditor = dynamic(
	() => import('components/TextEditor/TextEditor'),
	{ ssr: false }
)

const Test: FC = () => {
	const [text, setText] = useState('')

	const handleTextChange = (value) => {
		setText(value)
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
