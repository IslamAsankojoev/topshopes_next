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
import StringHTML from 'src/components/StringHTML/StringHTML'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';


const PaymentDialog: FC<{ images?: string[], text: string }> = ({ images, text }) => {
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
				<InfoRoundedIcon sx={{ fontSize: 25 }} />
			</IconButton>

			<Dialog open={addCardForm} onClose={() => setAddCardForm(false)}>
				<DialogContent>
					<Typography variant="h6" mb={3}>
						Инструкция
					</Typography>
					<Typography variant="body1" mb={3}>
						<StringHTML>{text.replaceAll("|" , "<br>")}</StringHTML>
					</Typography>

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
// 		kz: "Нұсқау",
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
