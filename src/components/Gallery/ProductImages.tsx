import {
	Button,
	Card,
	Grid,
	IconButton,
	ImageList,
	ImageListItem,
	ImageListItemBar,
} from '@mui/material'
import { FC } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import { Close } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { IImage } from 'shared/types/product.types'

interface IProductImages {
	images: IImage[]
	remove: (item: IImage | File) => void
	add: (image: File) => void
	productVariant?: string
}

const ProductImages: FC<IProductImages> = ({ images, remove, add }) => {
	const getImgUrl = (img: File | Blob | string | any) => {
		if (!img) return false
		if (typeof img != 'string') {
			return URL.createObjectURL(img)
		}
		return img
	}

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if ([...e.target.files]?.length > 5) {
			toast.error('You can upload max 5 images')
		}
		const images = [...e.target.files].slice(0, 5)
		if (!images) return

		for (let img of images) {
			await add(img)
		}
	}

	const handleRemove = async (item: IImage) => {
		await remove(item)
	}

	return (
		<div>
			<h3>Product images</h3>
			{images?.length > 0 ? (
				<Grid container gap={0}>
					{images.map((item: IImage) => (
						<Grid item xs={6} sm={6} md={6}>
							<Card
								variant="outlined"
								sx={{ border: '1px solid #EAEAEA', margin: '5px' }}
							>
								<ImageListItem
									key={getImgUrl(item.image) + 'img'}
									style={{
										height: '200px',
									}}
								>
									<img
										src={`${getImgUrl(item.image)}`}
										alt={`${getImgUrl(item.image)}`}
										loading="lazy"
										width={200}
										object-fit="contain"
										object-position="center"
									/>
									<ImageListItemBar
										sx={{
											background: 'transparent',
										}}
										position="top"
										actionIcon={
											<Button
												variant="contained"
												color="error"
												size="small"
												sx={{
													borderRadius: '0 0 0 10px',
												}}
												onClick={() => handleRemove(item)}
											>
												<Close />
											</Button>
										}
									/>
								</ImageListItem>
							</Card>
						</Grid>
					))}
				</Grid>
			) : null}
			<br />
			<Button
				variant="contained"
				color="info"
				component="label"
				startIcon={<AddToPhotosIcon />}
			>
				add image
				<input
					onChange={(e) => handleImageChange(e)}
					hidden
					accept="image/png, image/jpeg, image/jpg, image/webp"
					multiple
					type="file"
				/>
			</Button>
		</div>
	)
}

export default ProductImages
