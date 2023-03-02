import { ModeEditOutline } from '@mui/icons-material'
import {
	Button,
	Dialog,
	DialogContent,
	Grid,
	IconButton,
	TextField,
	Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import { FC, Fragment, useState } from 'react'
import PhoneNumberMask from 'src/components/Form/PhoneNumberMask'
import { IAddress } from 'src/shared/types/user.types'
import * as yup from 'yup'

const checkoutSchema = yup.object({
	country: yup.string().required('required'),
	city: yup.string().required('required'),
	street: yup.string().required('required'),
	phone: yup.number().required('required'),
})

// ==================================================================
type EditAddressFormProps = {
	address: IAddress
	mutateAsync: ({ id, data }: { id: string; data: Record<string, any> }) => void
}
// ==================================================================

const EditAddressForm: FC<EditAddressFormProps> = ({
	mutateAsync,
	address,
}) => {
	const { t } = useTranslation('common')
	const [addCardForm, setAddCardForm] = useState<boolean>(false)

	const { handleChange, handleSubmit, errors, touched, values } = useFormik({
		initialValues: address,
		validationSchema: checkoutSchema,
		onSubmit: (values) => {
			mutateAsync({ id: address.id, data: values })
			setAddCardForm(false)
		},
	})

	return (
		<Fragment>
			<IconButton
				size="small"
				sx={{ mr: 1 }}
				onClick={() =>
					addCardForm ? setAddCardForm(false) : setAddCardForm(true)
				}
			>
				<ModeEditOutline sx={{ fontSize: 20 }} />
			</IconButton>

			<Dialog open={addCardForm} onClose={() => setAddCardForm(false)}>
				<DialogContent>
					<Typography variant="h6" mb={3}>
						{t('addressUpdate')}
					</Typography>

					<form onSubmit={handleSubmit}>
						<Grid container spacing={3}>
							<Grid item sm={6} xs={12}>
								<TextField
									fullWidth
									type="text"
									name="country"
									value={values.country}
									label={t('country')}
									onChange={handleChange}
									helperText={touched.country && errors.country}
									error={touched.country && Boolean(errors.country)}
								/>
							</Grid>
							<Grid item sm={6} xs={12}>
								<TextField
									fullWidth
									type="text"
									name="city"
									label={t('city')}
									value={values.city}
									onChange={handleChange}
									helperText={touched.city && errors.city}
									error={touched.city && Boolean(errors.city)}
								/>
							</Grid>

							<Grid item sm={6} xs={12}>
								<TextField
									fullWidth
									type="text"
									name="street"
									label={t('street')}
									value={values.street}
									onChange={handleChange}
									helperText={touched.street && errors.street}
									error={touched.street && Boolean(errors.street)}
								/>
							</Grid>

							<Grid item sm={6} xs={12}>
								<TextField
									fullWidth
									type="text"
									name="phone"
									value={values.phone}
									onChange={handleChange}
									label={t('phone')}
									error={touched.phone && Boolean(errors.phone)}
									helperText={touched.phone && errors.phone}
									InputProps={{
										inputComponent: PhoneNumberMask as any,
									}}
								/>
							</Grid>

							<Grid item sm={6} xs={12}>
								<Button color="primary" variant="contained" type="submit">
									{t('saveChanges')}
								</Button>
							</Grid>
						</Grid>
					</form>
				</DialogContent>
			</Dialog>
		</Fragment>
	)
}

export default EditAddressForm
