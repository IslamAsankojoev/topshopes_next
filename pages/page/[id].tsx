import styled from '@emotion/styled'
import { Container } from '@mui/material'
import { axiosClassic } from 'src/api/interceptor'
import Loading from 'src/components/Loading'
import ShopLayout1 from 'src/components/layouts/ShopLayout1'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

import { useQuery } from 'react-query'
import { IPages } from 'src/shared/types/pages.types'

export const getServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}
// =

const Page = () => {
	const { query } = useRouter()

	const {
		data: page,
		isLoading,
	}: { isLoading: any; error: any; data: IPages } = useQuery(
		['get page', query.id],
		() => axiosClassic.get(`/pages/${query.id}/`),
		{
			select: (data) => data.data,
			enabled: !!query.id,
		}
	)

	return (
		<ShopLayout1>
			{isLoading ? <Loading /> : null}
			<Container sx={{ mt: 4, mb: 6 }}>
				<Img>
					<img src={page?.image} />
				</Img>
				<h2>{page?.title}</h2>
				<div dangerouslySetInnerHTML={{ __html: page?.content?.data }}></div>
			</Container>
		</ShopLayout1>
	)
}

const Img = styled.div`
	width: 100%;

	img {
		width: auto;
		max-height: 300px;
	}
`

export default Page
