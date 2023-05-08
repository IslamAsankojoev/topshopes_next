import { Close, Edit } from '@mui/icons-material'
import { Box, Button, Grid, Typography } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { FlexBox } from 'src/components/flex-box'
import LazyImage from 'src/components/LazyImage'
import { IProductVariant } from 'src/shared/types/product.types'
import { getCurrency } from 'src/utils/getCurrency'
import { StyledTableCell, StyledTableRow } from '../../StyledComponents'
import { getImgUrl } from './productVariantHelper'
import VariantForm from './VariantForm'
import orderBy from 'lodash-es/orderBy'
import { LoadingButton } from '@mui/lab'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { localize } from 'src/utils/Translate/localize'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'

interface VariantRowProps {
	variant: IProductVariant
	variantFormOpen: boolean
	handleRemove: (id: string) => void
	handleChange: (data: IProductVariant) => void
	handleClone?: (data: IProductVariant) => void
	enableAnimations: (enabled: boolean) => void
	cloneLoading?: null | string
	mapIndex?: number
	handleUpOrdering?: (variant: IProductVariant, mapIndex: number) => void
	handleDownOrdering?: (variant: IProductVariant, mapIndex: number) => void
}

const VariantRow: FC<VariantRowProps> = ({
	variant,
	enableAnimations,
	handleChange,
	handleRemove,
	handleClone,
	cloneLoading,
	handleUpOrdering,
	handleDownOrdering,
	mapIndex,
}) => {
	const {
		thumbnail,
		price,
		discount,
		status,
		stock,
		attribute_values,
		id,
		ordering,
	} = variant
	const [openVariant, setOpenVariant] = useState(false)
	const user = useTypedSelector((state) => state.userStore.user)

	const handleRemoveThis = () => {
		id && handleRemove(id)
	}

	useEffect(() => {
		enableAnimations(false)
		console.log(user)
	}, [])

	return (
		<StyledTableRow
			tabIndex={-1}
			role="checkbox"
			className="variant_row"
			sx={{
				height: '75px',
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

			<StyledTableCell align="left">
				{localize({
					ru: status === 'available' ? 'Доступно' : 'Не доступно',
					en: status === 'available' ? 'Available' : 'Not available',
					tr: status === 'available' ? 'Mümkün' : 'Mümkün deyil',
				})}
			</StyledTableCell>

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
				<FlexBox columnGap={1} justifyContent="center">
					<LoadingButton
						size="small"
						loadingPosition="start"
						variant="contained"
						sx={{
							color: 'white',
							width: '40px',
							height: '30px',
							p: 0,
							borderRadius: '4px',
							transition: 'all 0.3s ease',
							'&:active': {
								transform: 'scale(0.9)',
							},
							'&:hover': {
								transform: 'scale(1.05)',
							},
						}}
						color="secondary"
						onClick={() => handleClone(variant)}
					>
						{user?.is_superuser ? (
							<img
								src={
									cloneLoading === variant.id
										? 'https://pa1.narvii.com/6707/686c3b62427e1d3fb06402d4849cce5dcb759aef_hq.gif'
										: 'https://i.pinimg.com/originals/b5/f4/05/b5f405e21abff867a56ca7a4458b8955.jpg'
								}
								alt=""
								width="100%"
								height="100%"
								style={{
									borderRadius: '4px',
									objectFit: 'cover',
								}}
							/>
						) : (
							<LibraryAddIcon />
						)}
					</LoadingButton>
					<Button
						size="small"
						variant="contained"
						color="secondary"
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
					<Button
						size="small"
						variant="contained"
						className="up-ordering"
						onClick={() => handleUpOrdering(variant, mapIndex)}
					>
						<ArrowDropUpIcon />
					</Button>
					<Button
						size="small"
						variant="contained"
						className="down-ordering"
						onClick={() => handleDownOrdering(variant, mapIndex)}
					>
						<ArrowDropDownIcon />
					</Button>
				</FlexBox>
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
