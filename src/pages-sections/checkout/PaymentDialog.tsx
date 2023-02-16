import styled from '@emotion/styled'
import { Visibility } from '@mui/icons-material'
import {
	Button,
	Dialog,
	DialogContent,
	IconButton,
	Typography,
} from '@mui/material'
import { FC, Fragment, useState } from 'react'


const PaymentDialog: FC<{ images?: string[] }> = ({ images }) => {
	const [addCardForm, setAddCardForm] = useState<boolean>(false)

	return (
		<Fragment>
			<IconButton
				size="small"
				sx={{ mr: 1 }}
				onClick={(e) => {
					setAddCardForm(!addCardForm)
					e.stopPropagation()
				}}
			>
				<Visibility sx={{ fontSize: 20 }} />
			</IconButton>

			<Dialog open={addCardForm} onClose={() => setAddCardForm(false)}>
				<DialogContent>
					<Typography variant="h6" mb={3}>
						Somth test
					</Typography>

					<Images>
						{images?.map((image, i) => (
							<img key={i} src={image} alt={'инструкция'} />
						))}
					</Images>
					<Button
						variant="contained"
						color={'primary'}
						onClick={() => setAddCardForm(false)}
					>
						Закрыть
					</Button>
				</DialogContent>
			</Dialog>
		</Fragment>
	)
}

// const tranlations = {
// 	instruction: {
// 		en: "Instruction",
// 		kk: "Нұсқау",
// 		kg: "Instruction",
// 		ru: "Инструкция",
// 		tr: "Talimat"
// 	}
// }

const Images = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	justify-content: center;

	img {
		max-width: 400px;
		width: 100%;
	}
`

export default PaymentDialog
