import {
	Button,
	Card,
	IconButton,
	ImageList,
	ImageListItem,
	ImageListItemBar,
} from '@mui/material'
import { FC, useEffect } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import { Close, Delete } from '@mui/icons-material'
import { toast } from 'react-toastify'

interface IProductImages {
	images: IProductImage[]
	refetch: () => void
	remove: (id: string) => void
	add: (image: File) => void
}
export type IProductImage = {
	id: string
	image: string
	product: string
}

const ProductImages: FC<IProductImages> = ({
	images,
	refetch,
	remove,
	add,
}) => {
	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if ([...e.target.files]?.length > 5) {
			toast.error('You can upload max 5 images')
		}
		const images = [...e.target.files].slice(0, 5)
		if (!images) return

		await images.forEach(async (image) => {
			await add(image)
			refetch()
		})
	}

	const handleRemove = async (id: string) => {
		await remove(id)
		refetch()
	}

	return (
		<Card sx={{ p: 6, mt: 2 }}>
			<h3>Product images</h3>
			{images?.length > 0 ? (
				<ImageList cols={5}>
					{images.map((item) => (
						<Card variant="outlined" sx={{ border: '1px solid #EAEAEA' }}>
							<ImageListItem key={item.image} sx={{ height: '100%!important' }}>
								<img
									src={`${item.image}`}
									height={248}
									alt={item.id}
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
											onClick={() => handleRemove(item.id)}
											aria-label={`info about ${item.id}`}
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
