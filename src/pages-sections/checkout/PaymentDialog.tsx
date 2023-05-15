import styled from '@emotion/styled'
import { Visibility } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography,
} from '@mui/material'
import { FC, Fragment, useState } from 'react'
import StringHTML from 'src/components/StringHTML/StringHTML'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import { FlexBetween } from 'src/components/flex-box'

const PaymentDialog: FC<{ images?: string[]; text: string }> = ({
	images,
	text,
}) => {
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

			<Dialog
				open={addCardForm}
				onClose={() => setAddCardForm(false)}
				sx={{
					zIndex: 1600,
				}}
			>
				<DialogTitle
					alignItems="center"
					sx={{
						position: 'relative',
					}}
				>
					<Typography variant="h6" align="center">
						Инструкция
					</Typography>
					<IconButton
						sx={{
							position: 'absolute',
							top: 10,
							right: 10,
						}}
						onClick={() => setAddCardForm(false)}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<Typography variant="body1" mb={3}>
						<StringHTML>
							{text.replaceAll('|', '<hr class="dashed">')}
						</StringHTML>
					</Typography>
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
