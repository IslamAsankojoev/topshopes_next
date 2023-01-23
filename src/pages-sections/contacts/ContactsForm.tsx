import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { toast } from 'react-toastify'

import { sendMessage } from '../../components/bot/TelegramBotMeassage'
import Icon from '../../components/icons/FaIcon/Icon'

interface formDataType {
	username: string
	email: string
	phone: number | ''
	message: string
}
const ContactsForm = () => {
	const { t } = useTranslation('contacts')

	const [formData, setFormData] = React.useState<formDataType>({
		username: '',
		email: '',
		phone: '',
		message: '',
	})

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			await sendMessage(`
			Обратная связь: 

			-имя: ${formData.username}
			-email: ${formData.email}
			-номер телефона: ${formData.phone}
			
			-сообщение: 
			"${formData.message}"
			`)
			setFormData({
				username: '',
				email: '',
				phone: '',
				message: '',
			})
			toast.success('успешно отправлено')
		} catch (e: unknown) {
			console.log(e)
			toast.error('не отправлено')
		}
	}

	return (
		<ContactForm>
			<Text>
				<p>
					<Icon size={'14px'} iconName={'FaMapMarkedAlt'} />
					<span>{t('address')}</span>
				</p>
				<p>
					<Icon size={'14px'} iconName={'FaPhoneAlt'} />
					<span>+996 550 022 101</span>
				</p>
			</Text>
			<h2>{t('question')}</h2>

			<form onSubmit={onSubmit}>
				<DoubleInput>
					<TextField
						variant={'standard'}
						name={'username'}
						onChange={onChange}
						value={formData.username}
						fullWidth
						required
						label={t('name')}
					/>
					<TextField
						variant={'standard'}
						name={'email'}
						onChange={onChange}
						value={formData.email}
						fullWidth
						required
						type={'email'}
						label={'email'}
					/>
				</DoubleInput>
				<TextField
					variant={'standard'}
					name={'phone'}
					onChange={onChange}
					value={formData.phone}
					fullWidth
					required
					label={t('phone')}
				/>
				<TextField
					variant={'standard'}
					required
					fullWidth
					multiline
					onChange={onChange}
					value={formData.message}
					rows={5}
					name={'message'}
					label={t('message')}
				/>
				<Button type={'submit'} color={'secondary'} variant={'contained'}>
					{t('ask')}
				</Button>
			</form>
		</ContactForm>
	)
}

const Text = styled.div`
	display: flex;
	grid-gap: 0 20px;
	font-weight: 700;
	p {
		display: flex;
		align-items: center;
	}
	svg {
		margin-right: 5px;
	}
`

const ContactForm = styled.div`
	display: grid;
	align-content: center;
	align-items: center;
	max-width: 470px;
	width: 100%;
	padding: 0 20px;

	h2 {
		margin-top: 0;
	}
	form {
		display: grid;
		grid-gap: 20px 0;

		//remove the arrows input type=number
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
		}
	}
	@media (max-width: 900px) {
		& {
			margin-top: 20px;
		}
	}
`
const DoubleInput = styled.div`
	display: flex;
	grid-gap: 0 10px;
`

export default ContactsForm
