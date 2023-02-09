import { Delete, Edit } from '@mui/icons-material'
import CheckIcon from '@mui/icons-material/Check'
import {
	Avatar,
	Box,
	Button,
	Chip,
	FormControl,
	Grid,
	IconButton,
	MenuItem,
	Select,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material'
import { AdminProductsService } from 'api/services-admin/products/products.service'
import BazaarSwitch from 'components/BazaarSwitch'
import LazyImage from 'components/LazyImage'
import { Paragraph, Small } from 'components/Typography'
import { FlexBetween, FlexBox } from 'components/flex-box'
import currency from 'currency.js'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import {
	IProduct,
	IProductAttribute,
	IProductAttributeValue,
	IProductPreview,
	IProductVariant,
	IProductVariantStatus,
} from 'shared/types/product.types'

import TooltipList from '../../../../components/tooltip/TooltipList'
import {
	CategoryWrapper,
	StatusWrapper,
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from '../../StyledComponents'

import ProductAttributes from './productVariantAttribute'
import { getImgUrl } from './productVariantHelper'

// ========================================================================
type VariantRowProps = { variant: IProductVariant; refetch?: () => void }
// ========================================================================

const variantStatus = ['available', 'unavailable']

const VariantRow: FC<VariantRowProps> = ({ variant, refetch }) => {
	const {
		attribute_values,
		discount,
		discount_price,
		id,
		images,
		nodeRef,
		overall_price,
		price,
		product,
		status,
		stock,
		thumbnail,
	} = variant
	const router = useRouter()
	const [isEdit, setIsEdit] = useState(false)
	const [priceS, setPriceS] = useState(price)
	const [stockS, setStockS] = useState(stock)
	const [statusS, setStatusS] = useState(status)
	const [isEditAttribute, setIsEditAttribute] = useState(false)

	const [actualVariant, setActualVariant] = useState<IProductVariant>(variant)

	//handlers
	const onDelete = async () => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			try {
				await AdminProductsService.delete(id)
				refetch()
			} catch (e: unknown) {
				toast.error('An error has occurred')
			}
		}
	}

	useEffect(() => {
		if (
			priceS !== price ||
			stockS !== stock ||
			statusS !== status ||
			isEditAttribute
		) {
			setIsEdit(true)
		} else {
			setIsEdit(false)
		}
	}, [priceS, stockS, statusS, isEditAttribute])

	return (
		<StyledTableRow>
			<StyledTableCell>
				<FlexBox alignContent="center">
					<Avatar src={getImgUrl(thumbnail)} />
					<TextField
						className="editable-input"
						InputProps={{
							sx: {
								height: 40,
								'&>fieldset': {
									borderWidth: 0,
								},
							},
						}}
						value={priceS}
						onChange={(e) => setPriceS(e.target.value)}
					/>
				</FlexBox>
			</StyledTableCell>
			<StyledTableCell>
				<Box>
					<TextField
						className="editable-input"
						InputProps={{
							sx: {
								height: 40,
								'&>fieldset': {
									borderWidth: 0,
								},
							},
						}}
						value={stockS}
						type="number"
						onChange={(e) => setStockS(e.target.value as any)}
					/>
				</Box>
			</StyledTableCell>
			<StyledTableCell>
				<Box>
					<FormControl fullWidth variant="outlined">
						<Select
							className="order-status-admin"
							sx={{
								'& .MuiSelect-select': {
									padding: '0px',
									fontSize: '1rem',
									fontWeight: 400,
									color: 'text.primary',
									backgroundColor: 'background.paper',
									border: '0px solid!important',
									borderColor: 'divider',
									'& fieldset': {
										display: 'none!important',
									},
								},
							}}
							SelectDisplayProps={{
								style: {
									padding: '0px',
									fontSize: '1rem',
									fontWeight: 400,
									color: 'text.primary',
									backgroundColor: 'background.paper',
									border: '0px solid!important',
									borderColor: 'divider',
									outline: 'none',
								},
							}}
							disableUnderline={true}
							value={statusS}
							onChange={(e) => {
								setStatusS(e.target.value as any)
							}}
						>
							{variantStatus.map((status: IProductVariantStatus) => (
								<MenuItem key={status} value={status}>
									<StatusWrapper status={status}>{status}</StatusWrapper>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
			</StyledTableCell>
			{attribute_values?.map((attribute: IProductAttributeValue) => (
				<StyledTableCell>
					<Box>
						<TextField
							className="editable-input"
							InputProps={{
								label: attribute.name,
								sx: {
									height: 40,
									'&>fieldset': {
										borderWidth: 0,
									},
								},
							}}
							value={attribute.value}
							type="number"
							onChange={(e) => setStockS(e.target.value as any)}
						/>
					</Box>
				</StyledTableCell>
			))}

			<StyledTableCell>
				<Box>
					<Button
						variant="contained"
						startIcon={<CheckIcon />}
						color={isEdit ? 'success' : 'inherit'}
						sx={{
							'&.MuiButton-contained': {
								backgroundColor: isEdit ? 'success.main' : 'inherit',
								color: isEdit ? 'success.contrastText' : 'inherit',
								pointerEvents: isEdit ? 'all' : 'none',
							},
						}}
						size="small"
					>
						Save
					</Button>
				</Box>
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default VariantRow
