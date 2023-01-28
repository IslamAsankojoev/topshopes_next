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
import { FC } from 'react'
import { toast } from 'react-toastify'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { IImage } from 'shared/types/product.types'

interface IProductImages {
	images: IImage[]
	remove: (item: IImage | File) => void
	add: (image: File) => void
	productVariant?: string
}

const ProductImages: FC<IProductImages> = ({ images, remove, add }) => {
	const { t } = useTranslation('admin')

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
		<>
			<br />
			<h3>{t('productImg')}</h3>
			<Grid container gap={0}>
				<TransitionGroup component={null}>
					{images.length > 0 &&
						images.map((item, index) => {
							return (
								<CSSTransition
									key={item.id}
									timeout={130}
									sx={{
										'&.image-item-enter': {
											opacity: 0,
											maxWidth: '0px',
											transform: 'scale(.5)',
										},
										'&.image-item-enter-active': {
											opacity: 1,
											maxWidth: '150px',
											transform: 'scale(1)',
											transition: 'all 130ms ease-in-out',
										},
										'&.image-item-exit': {
											opacity: 1,
											maxWidth: '150px',
											transform: 'scale(1)',
										},
										'&.image-item-exit-active': {
											opacity: 0,
											maxWidth: '0px',
											transform: 'scale(.5)',
											transition: 'all 130ms ease-in-out',
										},
									}}
									classNames="image-item"
									unmountOnExit
									nodeRef={item.nodeRef}
								>
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
								</CSSTransition>
							)
						})}
				</TransitionGroup>
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
							startIcon={<AddIcon />}
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'column',
								borderStyle: 'dashed',
								height: '100%',
								minHeight: '150px',
								backgroundColor: '#F7F9FC',
							}}
						>
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
