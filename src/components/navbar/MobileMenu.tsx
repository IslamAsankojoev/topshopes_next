import { Clear, ExpandMore, Menu } from '@mui/icons-material'
import {
	Accordion,
	AccordionSummary,
	Box,
	Button,
	darken,
	Drawer,
	IconButton,
} from '@mui/material'
import Scrollbar from 'src/components/Scrollbar'
import { H4, H5, H6 } from 'src/components/Typography'
import NavLink from 'src/components/nav-link/NavLink'
import navbarNavigations from 'src/data/navbarNavigations'
import { useTranslation } from 'next-i18next'
import { FC, Fragment, useState } from 'react'
import { useRouter } from 'next/router'

const MobileMenu: FC = () => {
	const [openDrawer, setOpenDrawer] = useState(false)
	const { t } = useTranslation('common')
	const { push } = useRouter()

	const updateNavigations = navbarNavigations.reduce((prev: any, curr: any) => {
		const newArr = [...prev]

		if (!curr.child) {
			newArr.push({ ...curr, extLink: true })
		} else if (curr.megaMenu || curr.megaMenuWithSub) {
			const flated = curr.child.flat()
			newArr.push({ title: curr.title, child: flated })
		} else {
			newArr.push(curr)
		}

		return newArr
	}, [])

	const renderLevels = (data: any) => {
		return data?.map((item: any, index: any) => {
			if (item.child) {
				return (
					<Accordion
						square
						key={index}
						elevation={0}
						disableGutters
						sx={{
							'&:not(:last-child)': { borderBottom: 0 },
							'&:before': { display: 'none' },
						}}
					>
						<AccordionSummary
							expandIcon={<ExpandMore />}
							sx={{
								padding: 0,
								boxShadow: 'none',
								minHeight: 48,
								'& .Mui-expanded': { color: 'primary.main', margin: 0 },
								'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
									margin: 0,
									'& .MuiSvgIcon-root': { color: 'primary.main' },
								},
							}}
						>
							<H6>{item.title}</H6>
						</AccordionSummary>

						<Box mx={2}>{renderLevels(item.child)}</Box>
					</Accordion>
				)
			}

			if (item.extLink) {
				return (
					<Button
						variant="contained"
						sx={{
							display: 'block',
							width: '100%',
							backgroundColor: 'grey.300',
							boxShadow: 'none',
							'&:hover, &:focus': {
								backgroundColor: 'grey.400',
							},
						}}
						key={index}
						onClick={() => {
							push(item.url)
						}}
					>
						<H5 py={1}>{t(item.title)}</H5>
					</Button>
				)
			}

			return (
				<Box key={index} py={1}>
					<NavLink href={item.url}>{t(item.title)}</NavLink>
				</Box>
			)
		})
	}

	return (
		<Fragment>
			<IconButton
				onClick={() => setOpenDrawer((prev) => !prev)}
				sx={{
					flexShrink: 0,
					border: (theme) => `1px solid ${theme.palette.grey[400]}`,
				}}
			>
				{openDrawer ? <Clear /> : <Menu />}
			</IconButton>

			<Drawer
				anchor="right"
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				sx={{ zIndex: 15001 }}
			>
				<Box sx={{ width: '100vw', height: '100%', position: 'relative' }}>
					{/* <Scrollbar
						autoHide={false}
						sx={{
							height: '100vh',
							display: 'flex!important',
							flexDirection: 'column',
							justifyContent: 'center',
						}}
					> */}
					<Box
						maxWidth={500}
						margin="auto"
						position="relative"
						height="100%"
						display="flex"
						flexDirection="column"
						justifyContent="flex-start"
						px={8}
						py={20}
						gap={2}
					>
						{/* <IconButton
							onClick={() => setOpenDrawer(false)}
							sx={{ position: 'absolute', right: 30, top: 15 }}
						>
							<Clear
								fontSize="large"
								sx={{
									fontSize: '1.9rem',
									color: 'grey.600',
								}}
							/>
						</IconButton> */}
						<IconButton
							onClick={() => setOpenDrawer(false)}
							sx={{
								flexShrink: 0,
								border: (theme) => `1px solid ${theme.palette.grey[400]}`,
								position: 'absolute',
								transition: 'all 0.3s ease',
								right: openDrawer ? '15px' : 0,
								top: openDrawer ? 45 : 0,
							}}
						>
							<Clear />
						</IconButton>

						{renderLevels(updateNavigations)}
					</Box>
					{/* </Scrollbar> */}
				</Box>
			</Drawer>
		</Fragment>
	)
}

export default MobileMenu
