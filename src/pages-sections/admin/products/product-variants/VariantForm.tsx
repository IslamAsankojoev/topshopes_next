import {
	Button,
	Dialog,
	DialogContent,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material'
import { FC, Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { CategoriesService } from 'src/api/services/categories/category.service'
import CreateForm from 'src/components/Form/CreateForm'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import {
	IProductAttribute,
	IProductAttributeValue,
	IProductVariant,
} from 'src/shared/types/product.types'
import { productVariantFormCreate } from 'src/utils/constants/forms'
import { formDataToObj, hashMapToObjectArray } from 'src/utils/formData'
import { v4 } from 'uuid'
import AttributesForm from './AttributesForm'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
	initialVariant?: IProductVariant | any
	handleFormSubmit: (data: IProductVariant, attrValueID?: number) => void
	open: boolean
	setOpen: any
	initialAttributes?: any
}

const VariantForm: FC<Props> = ({
	initialVariant,
	handleFormSubmit,
	open = false,
	setOpen,
}) => {
	const currentCategory = useTypedSelector(
		(state) => state.productVariantsStore.currentCategory
	)

	const { data: attributes } = useQuery(
		['attributes', currentCategory],
		() => CategoriesService.get(currentCategory),
		{
			enabled: !!currentCategory,
			select: (data) => data.attributes,
		}
	)

	const [attributeValues, setAttributeValues] =
		useState<Record<string, IProductAttribute>>(null)

	const handleChangeWithAttribute = async (data: FormData | any) => {
		data = formDataToObj(data) as IProductVariant
		data.id = initialVariant?.id || v4()
		data.thumbnail = data.thumbnail || initialVariant?.thumbnail
		data.attribute_values = attributeValues
			? Object?.values(attributeValues)
			: []

		await handleFormSubmit(data)
		setAttributeValues(null)
		setOpen(false)
	}

	useEffect(() => {
		const assignObject = {}
		initialVariant?.attribute_values.forEach((a) => {
			Object.assign(assignObject, { [a.attribute.name]: a })
		})
		setAttributeValues(assignObject)
	}, [initialVariant?.attribute_values])

	return (
		<Dialog
			open={open}
			onClose={() => {
				setOpen(false)
			}}
		>
			<DialogContent
				sx={{
					backgroundColor: '#F7F9FC',
					padding: '0px',
					position: 'relative',
				}}
			>
				<Button
					sx={{
						position: 'absolute',
						right: '10px',
						top: '10px',
						zIndex: 1,
					}}
					onClick={() => {
						setOpen(false)
					}}
				>
					<CloseIcon fontSize="medium" />
				</Button>

				<CreateForm
					defaultData={initialVariant}
					fields={productVariantFormCreate}
					handleFormSubmit={handleChangeWithAttribute}
					actionButtons={
						<Fragment>
							<Button
								onClick={() => {
									setOpen(false)
								}}
								variant="contained"
								color="error"
								size="small"
							>
								Отмена
							</Button>
						</Fragment>
					}
					children={
						<Fragment>
							<AttributesForm
								attributes={attributes}
								attributeValues={attributeValues}
								setAttributeValues={setAttributeValues}
								initialAttributes={initialVariant?.attribute_values}
							/>
						</Fragment>
					}
				/>
			</DialogContent>
		</Dialog>
	)
}

export default VariantForm
