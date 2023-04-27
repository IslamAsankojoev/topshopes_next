import {
	Card,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material'
import { FC, useEffect, useState, MouseEvent } from 'react'

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

	return (
		<>
			<Card
				style={{
					marginBottom: '0.5rem',
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
		</>
	)
}

export default AttributeSelect
