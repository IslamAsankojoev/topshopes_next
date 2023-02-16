import {
	Avatar,
	Button,
	Container,
	Dialog,
	DialogContent,
	Typography,
} from '@mui/material'
import { MoneyTransferService } from 'api/services-admin/money-transfer/MoneyTransfer.service'
import CreateForm from 'components/Form/CreateForm'
import Loading from 'components/Loading'
import { useTranslation } from 'next-i18next'
import { Fragment, useState } from 'react'
import { useMutation } from 'react-query'

const TransferDialogForm = ({ transferMoney, refetch }) => {
	const { t: adminT } = useTranslation('admin')
	const [addCardForm, setAddCardForm] = useState<boolean>(false)

	const { mutateAsync, isLoading } = useMutation(
		'transfer img',
		(data: FormData) => MoneyTransferService.update(transferMoney.id, data)
	)

	const handleFormSubmit = async (data: FormData) => {
		await mutateAsync(data)
		await refetch()
	}

	if (transferMoney.confirm_photo) {
		return (
			<Fragment>
				<Avatar
					sx={{ borderRadius: '5px', ml: '20px' }}
					color="success"
					src={transferMoney.confirm_photo}
					onClick={() =>
						addCardForm ? setAddCardForm(false) : setAddCardForm(true)
					}
				/>

				<Dialog open={addCardForm} onClose={() => setAddCardForm(false)}>
					<DialogContent
						sx={{
							backgroundColor: '#F7F9FC',
						}}
					>
						<Container>
							<Typography variant="h6" mb={3} textAlign="center">
								{adminT('thumbnail')}
							</Typography>
							<img
								style={{
									maxWidth: '600px',
									width: '100%',
									objectFit: 'contain',
								}}
								src={transferMoney.confirm_photo}
							/>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									margin: '20px 0 0',
								}}
							>
								<Button
									onClick={() => setAddCardForm(false)}
									variant="contained"
									color="success"
									size="small"
								>
									Ok
								</Button>
							</div>
						</Container>
					</DialogContent>
				</Dialog>
			</Fragment>
		)
	}

	return (
		<Fragment>
			{isLoading ? <Loading /> : null}
			<Avatar
				sx={{ borderRadius: '5px', ml: '20px' }}
				color="success"
				onClick={() =>
					addCardForm ? setAddCardForm(false) : setAddCardForm(true)
				}
				src={'/public/assets/images/placeholder.jpg'}
			/>

			<Dialog open={addCardForm} onClose={() => setAddCardForm(false)}>
				<DialogContent
					sx={{
						backgroundColor: '#F7F9FC',
					}}
				>
					<Container>
						<Typography variant="h6" mb={3} textAlign="center">
							{adminT('thumbnail')}
						</Typography>

						<CreateForm
							defaultData={{}}
							fields={[
								{
									name: 'confirm_photo',
									label: 'thumbnail',
									type: 'file',
									placeholder: 'thumbnail',
									required: true,
									fullWidth: true,
								},
							]}
							handleFormSubmit={handleFormSubmit}
							actionButtons={
								<Fragment>
									<Button
										onClick={() => setAddCardForm(false)}
										variant="contained"
										color="error"
										size="small"
									>
										{adminT('cancel')}
									</Button>
								</Fragment>
							}
						/>
					</Container>
				</DialogContent>
			</Dialog>
		</Fragment>
	)
}

export default TransferDialogForm
