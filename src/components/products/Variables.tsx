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
	IColor,
	IProduct,
	IProductVariant,
	ISize,
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
	const sizes = [
		...new Set(product.variants.map((variant) => variant.size.name)),
	]
	const colors = [
		...new Set(product.variants.map((variant) => variant.color.color)),
	]
	const [currentColor, setCurrentColor] = useState<IColor>(
		product.variants[0].color
	)
	const [currentSize, setCurrentSize] = useState<ISize>(
		product.variants[0].size
	)

	const setCurrentVariant = (color: IColor, size: ISize) => {
		const exist = product.variants.find(
			(variant) =>
				variant?.color?.color === color?.color &&
				variant?.size?.name === size?.name
		)
		setVariant(exist)
	}
	const setCurrentImage = (color: IColor) => {
		const exist = product.variants.find(
			(variant) => variant?.color?.color === color?.color
		)
		setImage(exist?.thumbnail)
	}

	const handleChangeSize = (size: string) => {
		setCurrentSize(
			product.variants.find((variant) => variant?.size?.name === size)?.size
		)
	}

	const handleChangeColor = (color: string) => {
		setCurrentColor(
			product.variants.find((variant) => variant?.color?.color === color)?.color
		)
	}

	useEffect(() => {
		setCurrentImage(currentColor || product.variants[0].color)
	}, [currentColor])

	useEffect(() => {
		setCurrentVariant(currentColor, currentSize)
	}, [currentColor, currentSize])

	return (
		<>
			<div className="status">
				<div className="status__left">
					<div className="status__left__value">
						<Box color="black">Stock {variant?.status || 'unavailable'}</Box>
					</div>
				</div>
			</div>

			<div className="color">
				<div className="color__options">
					{colors.map((color, ind) => (
						<>
							<Radio
								key={ind}
								checked={currentColor?.color === color}
								onChange={() => {
									handleChangeColor(color)
								}}
								value={color}
								name="radio-buttons"
								sx={{
									'& .MuiSvgIcon-root': {
										width: '1.5rem',
										height: '1.5rem',
										border:
											currentColor?.color === color
												? '2px solid #24375F'
												: '0px solid #fff',
										borderRadius: '50%',
										backgroundColor: color,
										boxShadow: '0 0 10px -6px #000',
									},
									color: color,
									'&.Mui-checked': {
										color: color,
									},
								}}
							/>
						</>
					))}
				</div>
			</div>
			<div className="size">
				<div className="size__options">
					<FormControl>
						<RadioGroup
							row
							name="position"
							defaultValue="top"
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{sizes.map((size, ind) => (
								<>
									<FormControlLabel
										value={size}
										control={<Radio />}
										label={size}
										checked={currentSize?.name === size}
										onChange={() => {
											handleChangeSize(size)
										}}
										labelPlacement="end"
										sx={{
											color: 'black',
											margin: '0px 4px 10px 4px',
											'& .MuiRadio-root': {
												display: 'none',
											},
											'& .MuiRadio-root + span': {
												boxShadow: '0 0 10px -6px #000',
												padding: '0.2em 0.5em',
												borderRadius: '0.5em',
												fontWeight: '600',
											},
											'& .Mui-checked + span': {
												border: '1.5px solid #24375F',
											},
										}}
									/>
								</>
							))}
						</RadioGroup>
					</FormControl>
				</div>
			</div>
		</>
	)
}

export default Variables
