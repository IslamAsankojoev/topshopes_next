import {
	Button,
	Card,
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
		<Card sx={{ p: 6, mt: 2 }}>
			<h3>Product images</h3>
			{images?.length > 0 ? (
				<ImageList cols={5}>
					{images.map((item: IImage) => (
						<Card variant="outlined" sx={{ border: '1px solid #EAEAEA' }}>
							<ImageListItem
								key={getImgUrl(item.image) + 'img'}
								sx={{ height: '100%!important' }}
							>
								<img
									src={`${getImgUrl(item.image)}`}
									height={248}
									alt={`${getImgUrl(item.image)}`}
									loading="lazy"
								/>
								<ImageListItemBar
									sx={{
										background: 'transparent',
									}}
									position="top"
									actionIcon={
										<IconButton
											color="error"
											onClick={() => handleRemove(item)}
										>
											<Close color="error" />
										</IconButton>
									}
								/>
							</ImageListItem>
						</Card>
					))}
				</ImageList>
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
		</Card>
	)
}

export default ProductImages
