import {
	Box,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import {
	IProduct,
	IProductAttributeValue,
	IProductVariant,
} from 'shared/types/product.types'

type VariablesProps = {
	product: IProduct
	setVariant: (product: IProductVariant) => void
	setImage?: (image: string) => void
	variant?: IProductVariant
}

const Variables: FC<VariablesProps> = ({
	product,
	setVariant,
	setImage,
	variant,
}) => {
	const [attributesValues, setAttributesValues] = useState<
		IProductAttributeValue[]
	>([])

	useEffect(() => {
		if (variant) {
			console.log(product.variants)
		}
	}, [variant])

	return <></>
}

export default Variables
