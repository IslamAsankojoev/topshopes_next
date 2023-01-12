import { Container } from '@mui/material'
import { axiosClassic } from 'api/interceptor'
import ShopLayout1 from 'components/layouts/ShopLayout1'
import Loading from 'components/Loading'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'
import { IPages } from 'shared/types/pages.types'

const Page = () => {
	const { query } = useRouter()

	const {
		data: page,
		isLoading,
	}: { isLoading: any; error: any; data: IPages } = useQuery(
		'get page',
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
				<div dangerouslySetInnerHTML={{ __html: page?.content?.data }}></div>
			</Container>
		</ShopLayout1>
	)
}

export default Page
