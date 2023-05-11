import {
	Box,
	Card,
	FormControl,
	Grid,
	Paper,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material'
import { FC, useEffect, useState, MouseEvent } from 'react'
import {
	IProductAttribute,
	IProductAttributeValue,
	IProductVariant,
} from 'src/shared/types/product.types'
import Carousel from '../carousel/Carousel'
import { grey, primary } from 'src/theme/themeColors'

type AttributeSelectProps = {
	attribute_name: string
	attribute_values: string[]
	variant?: any
	setSelectedAttributes: any
	variants: any
}

const AttributeSelect: FC<AttributeSelectProps> = ({
	attribute_name,
	attribute_values,
	variant,
	setSelectedAttributes,
	variants,
}) => {
	const [selectedAttribute, setSelectedAttribute] = useState<string>('')

	const handleAttribute = (event, newAlignment: any) => {
		if (newAlignment !== null) {
			setSelectedAttribute(newAlignment)
		}
	}

	useEffect(() => {
		setSelectedAttributes((prev) => [
			...prev.filter(
				(attribute) =>
					attribute.name !== attribute_name &&
					attribute.value !== selectedAttribute
			),
			{
				name: attribute_name,
				value: selectedAttribute,
			},
		])
	}, [selectedAttribute])

	useEffect(() => {
		setSelectedAttribute(
			variant?.attribute_values.find(
				(attribute_value: any) =>
					attribute_value.attribute.name === attribute_name
			)?.value
		)
	}, [])

	if (attribute_name === 'Вариант' || attribute_name === 'Цвет') {
		return (
			<>
				<FormControl sx={{ display: 'inline-block', order: 0 }}>
					<Typography
						sx={{
							fontSize: '11px',
							fontWeight: 'bold',
							padding: '0.4rem 0.4rem',
							textTransform: 'uppercase',
						}}
					>
						{attribute_name} -{' '}
						<Typography
							sx={{
								fontSize: '11px',
								fontWeight: 'bold',
								display: 'inline',
								color: 'primary.main',
							}}
						>
							{selectedAttribute}
						</Typography>
					</Typography>
					<Grid xs={12} sm={7} md={8} lg={8}>
						<Carousel
							totalSlides={attribute_values?.length}
							visibleSlides={5}
							spacing="10px"
							sx={{
								width: '100%',
							}}
							showArrow={attribute_values?.length > 5}
							rightButtonStyle={{
								width: '25px',
								height: '25px',
							}}
							leftButtonStyle={{
								width: '25px',
								height: '25px',
							}}
						>
							{attribute_values.sort().map((attribute_value) => {
								const attributeVariant: IProductVariant = variants.find(
									(variant) => {
										return variant.attribute_values.find((attribute) => {
											return attribute.value === attribute_value
										})
									}
								)

								return (
									<img
										src={attributeVariant.thumbnail}
										alt=""
										onClick={() => {
											setSelectedAttribute(attribute_value)
										}}
										style={{
											transition: 'all 0.2s ease',
											cursor: 'pointer',
											borderRadius: '0.5rem',
											border: `${
												selectedAttribute === attribute_value
													? `2px solid ${primary[500]}`
													: `2px solid ${grey[200]}`
											}`,
											backgroundColor: `white`,
											height: '100%',
											width: '100%',
											objectFit: 'cover',
										}}
									/>
								)
							})}
						</Carousel>
					</Grid>
				</FormControl>
			</>
		)
	}

	return (
		<>
			<FormControl sx={{ display: 'inline-block', order: 1 }}>
				<Card
					style={{
						backgroundColor: 'transparent',
						display: 'inline-block',
						boxShadow: 'none',
					}}
				>
					<Typography
						sx={{
							fontSize: '11px',
							fontWeight: 'bold',
							padding: '0.4rem 0.4rem',
							textTransform: 'uppercase',
						}}
					>
						{attribute_name}
					</Typography>
					<ToggleButtonGroup
						sx={{
							display: 'flex',
							flexDirection: 'row',
							flexWrap: 'wrap',
							justifyContent: 'flex-start',
							gap: '0.5rem',
						}}
						color="primary"
						value={selectedAttribute}
						exclusive
						onChange={(event: MouseEvent<HTMLElement>, attribute: any) => {
							handleAttribute(event, attribute)
						}}
						aria-label="Platform"
					>
						{attribute_values.sort().map((attribute_value) => {
							return (
								<ToggleButton
									sx={{
										position: 'relative',
										padding: '0.4rem 0.7rem',
										border: '.1px solid #dfdfdf!important',
										borderRadius: '0.5rem!important',
										overflow: 'hidden',
										backgroundColor: '#ffffff',
									}}
									key={attribute_value}
									value={attribute_value}
									aria-label={attribute_value}
								>
									<Typography
										sx={{
											fontSize: '14px',
											fontWeight: '500',
										}}
									>
										{attribute_value}
									</Typography>
								</ToggleButton>
							)
						})}
					</ToggleButtonGroup>
				</Card>
			</FormControl>
		</>
	)
}

export default AttributeSelect
