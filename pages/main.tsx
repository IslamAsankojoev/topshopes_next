import { Box } from '@mui/material'
import Setting from 'components/Setting'
import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Footer from 'pages-sections/landing/Footer'
import Section1 from 'pages-sections/landing/Section1'
import Section2 from 'pages-sections/landing/Section2'
import Section3 from 'pages-sections/landing/Section3'
import Section4 from 'pages-sections/landing/Section4'
import Section6 from 'pages-sections/landing/Section6'
import { useState } from 'react'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}

const IndexPage: NextPage = () => {
	const [filterDemo, setFilterDemo] = useState('')

	return (
		<Box id="top" overflow="hidden" bgcolor="background.paper">
			<Section1 />
			<Section6 setFilterDemo={setFilterDemo} />
			<Section2 />
			<Section3 filterDemo={filterDemo} setFilterDemo={setFilterDemo} />
			<Section4 />
			<Footer />
			<Setting />
		</Box>
	)
}

export default IndexPage
