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
		<Card
			style={{
				borderRadius: '0.5rem',
				padding: '0.5rem',
				marginBottom: '0.5rem',
				backgroundColor: '#fff',
				display: 'inline-block',
			}}
		>
			<Typography
				sx={{
					fontSize: '0.8rem',
					fontWeight: 'bold',
					padding: '0.2rem 0.5rem',
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
					justifyContent: 'space-between',
				}}
				color="primary"
				value={selectedAttribute}
				exclusive
				onChange={(event: MouseEvent<HTMLElement>, attribute: any) => {
					handleAttribute(event, attribute)
				}}
				aria-label="Platform"
			>
				{attribute_values.map((attribute_value) => {
					return (
						<ToggleButton
							sx={{
								position: 'relative',
								padding:
									attribute_name === 'color'
										? '0.4rem 1rem 0.4rem 1rem'
										: '0.4rem 0.7rem',
								border: '.1px solid #dfdfdf!important',
								borderRadius: '0.3rem!important',
								overflow: 'hidden',
								marginRight: '10px',
							}}
							key={attribute_value}
							value={attribute_value}
							aria-label={attribute_value}
						>
							<span
								style={{
									position: 'absolute',
									bottom: 0,
									right: 0,
									width: '100%',
									height: '8px',
									backgroundColor:
										attribute_name === 'color'
											? attribute_value
											: 'transparent',
								}}
							></span>
							<span
								style={{
									zIndex: 4,
								}}
							>
								{attribute_value}
							</span>
						</ToggleButton>
					)
				})}
			</ToggleButtonGroup>
		</Card>
	)
}

export default AttributeSelect
