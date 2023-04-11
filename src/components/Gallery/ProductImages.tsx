import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Close } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import {
	Button,
	Card,
	Grid,
	IconButton,
	ImageList,
	ImageListItem,
	ImageListItemBar,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { ChangeEvent, FC } from 'react'
import { toast } from 'react-toastify'
import { IImage } from 'src/shared/types/product.types'
import { localize } from 'src/utils/Translate/localize'

interface IProductImages {
	images: IImage[]
	remove: (item: IImage | File) => void
	add: (image: File) => void
	productVariant?: string
}

const ProductImages: FC<IProductImages> = ({ images, remove, add }) => {
	const { t } = useTranslation('admin')

	const [parent, enableAnimations] = useAutoAnimate()

	const getImgUrl = (img: File | Blob | string | any) => {
		if (!img) return false
		if (typeof img != 'string') {
			return URL.createObjectURL(img)
		}
		return img
	}

	const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if ([...e.target.files]?.length > 5) {
			toast.info(
				localize({
					ru: 'Максимальное количество изображений 5',
					tr: 'Maksimum resim sayısı 5',
					en: 'Maximum image count 5',
				})
			)
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
		<>
			<br />
			<h3>{t('productImg')}</h3>
			<Grid container gap={0} ref={parent}>
				{images.length > 0 &&
					images.map((item, index) => {
						return (
							<Grid
								ref={item.nodeRef}
								item
								xs={6}
								sm={4}
								md={4}
								sx={{
									minWidth: '150px',
									minHeight: '150px',
								}}
							>
								<Card
									variant="outlined"
									sx={{
										border: '1px solid #EAEAEA',
										margin: '5px',
									}}
								>
									<ImageListItem
										key={getImgUrl(item.image) + 'img'}
										style={{
											height: '150px',
										}}
									>
										<img
											src={`${getImgUrl(item.image)}`}
											alt={`${getImgUrl(item.image)}`}
											loading="lazy"
											width={150}
											height={150}
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
														padding: '2px',
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
						)
					})}
				<Grid
					item
					xs={6}
					sm={4}
					md={4}
					sx={{
						minHeight: '150px',
						minWidth: '150px',
					}}
				>
					<Card
						sx={{
							margin: '5px',
						}}
					>
						<Button
							fullWidth
							variant="outlined"
							color="info"
							component="label"
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'column',
								borderStyle: 'dashed',
								borderWidth: '2.5px',
								height: '100%',
								minHeight: '150px',
								backgroundColor: '#F7F9FC',
								'&:hover': {
									borderStyle: 'dashed',
									borderWidth: '2.5px',
								},
							}}
						>
							<AddIcon
								sx={{
									width: '30px',
									height: '30px',
									margin: '0!important',
								}}
							/>
							{t('addImage')}
							<input
								onChange={(e) => handleImageChange(e)}
								hidden
								accept="image/png, image/jpeg, image/jpg, image/webp"
								multiple
								type="file"
							/>
						</Button>
					</Card>
				</Grid>
			</Grid>
		</>
	)
}

export default ProductImages
