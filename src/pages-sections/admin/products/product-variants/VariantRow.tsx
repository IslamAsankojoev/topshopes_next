import { Close, Edit } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { FlexBox } from 'src/components/flex-box'
import LazyImage from 'src/components/LazyImage'
import { useActions } from 'src/hooks/useActions'
import { IProductVariant } from 'src/shared/types/product.types'
import { getCurrency } from 'src/utils/getCurrency'
import { StyledTableCell, StyledTableRow } from '../../StyledComponents'
import { getImgUrl } from './productVariantHelper'
import VariantForm from './VariantForm'
import orderBy from 'lodash-es/orderBy'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

interface VariantRowProps {
	variant: IProductVariant
	variantFormOpen: boolean
	handleRemove: (id: string) => void
	handleChange: (data: IProductVariant) => void
	handleClone?: (data: IProductVariant) => void
	enableAnimations: (enabled: boolean) => void
}

const VariantRow: FC<VariantRowProps> = ({
	variant,
	enableAnimations,
	handleChange,
	handleRemove,
	handleClone,
}) => {
	const { thumbnail, price, discount, status, stock, attribute_values, id } =
		variant
	const [openVariant, setOpenVariant] = useState(false)

	const handleRemoveThis = () => {
		id && handleRemove(id)
	}

	useEffect(() => {
		enableAnimations(false)
	}, [])

	return (
		<StyledTableRow
			tabIndex={-1}
			role="checkbox"
			sx={{
				height: '75px',
				// pointerEvents: 'none',
				// position: 'relative',
			}}
		>
			<StyledTableCell align="left">
				<FlexBox alignItems="center" gap={1.5}>
					<LazyImage
						src={getImgUrl(thumbnail)}
						width={50}
						height={50}
						sx={{ borderRadius: '8px' }}
					/>
				</FlexBox>
			</StyledTableCell>

			<StyledTableCell align="left">{getCurrency(price)}</StyledTableCell>

			<StyledTableCell align="left">{discount + '%'}</StyledTableCell>

			<StyledTableCell align="left">{status}</StyledTableCell>

			<StyledTableCell align="left">{stock}</StyledTableCell>

			<StyledTableCell
				sx={{
					p: 2,
				}}
			>
				{orderBy(attribute_values, (obj) => obj.attribute.name)
					?.map((attribute, index) => {
						return (
							<Box
								className="attribute_item"
								sx={{
									'&:last-child': {
										borderRightWidth: '0px',
									},
									display: 'inline-flex',
									flexDirection: 'column',
									padding: '0px 10px',
									border: '0px solid #000',
									borderColor: 'secondary.300',
									borderRightWidth: '2px',
								}}
								key={index}
							>
								<Typography
									sx={{
										color: 'secondary.300',
										fontWeight: 'bold',
										fontSize: '10px',
									}}
								>
									{attribute?.attribute?.name}
								</Typography>
								{attribute?.value}
							</Box>
						)
					})
					.reverse()}
			</StyledTableCell>

			<StyledTableCell align="center">
				<Button
					size="small"
					variant="contained"
					sx={{
						width: '40px',
						height: '30px',
						mr: 1,
						p: 0,
						borderRadius: '4px',
						transition: 'all 0.3s ease',
						'&:hover': {
							transform: 'scale(1.4)',
						},
					}}
					color="secondary"
					onClick={() => handleClone(variant)}
				>
					{/* <ContentCopyIcon /> */}
					<img
						src="https://i.pinimg.com/originals/b5/f4/05/b5f405e21abff867a56ca7a4458b8955.jpg"
						alt=""
						width="100%"
						height="100%"
						style={{
							borderRadius: '4px',
							objectFit: 'cover',
						}}
					/>
				</Button>
				<Button
					size="small"
					variant="contained"
					color="secondary"
					sx={{ mr: 1 }}
					onClick={() => setOpenVariant(true)}
				>
					<Edit />
				</Button>
				<Button
					size="small"
					variant="contained"
					color="error"
					onClick={handleRemoveThis}
				>
					<Close />
				</Button>
			</StyledTableCell>
			<VariantForm
				initialVariant={variant}
				setOpen={setOpenVariant}
				handleFormSubmit={handleChange}
				open={openVariant}
				initialAttributes={variant.attribute_values}
			/>
		</StyledTableRow>
	)
}

export default VariantRow
