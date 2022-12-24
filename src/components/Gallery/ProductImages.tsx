import { Button, Card } from '@mui/material'
import { FC } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'

interface IProductImages {
	images: IProductImage[]
	refetch: () => void
	remove: (id: string) => void
	add: (image: File) => void
}
export type IProductImage = {
	images: 'string'
}

const ProductImages: FC<IProductImages> = ({
	images,
	refetch,
	remove,
	add,
}) => {
	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const image = e.target.files[0]
		console.log(image)
		await add(image)
		refetch()
	}

	return (
		<Card sx={{ p: 6, mt: 2 }}>
			<h3>Product images</h3>
			{images.length > 0
				? images.map((image) => (
						<div key={image.images}>
							<img src={image.images} alt="product" />
							<button onClick={() => remove(image.images)}>Remove</button>
						</div>
				  ))
				: null}
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
					accept="image/*"
					multiple
					type="file"
				/>
			</Button>
		</Card>
	)
}

export default ProductImages
