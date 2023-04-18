import { Button } from '@mui/material'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { ShopsProductsService } from 'src/api/services/shops-products/ShopsProducts.service'

function Test() {
	const { data } = useQuery('products', () =>
		ShopsProductsService.getList({ page_size: 200 })
	)

	return (
		<div
			style={{
				width: '400px',
				maxWidth: '400px',
			}}
		>
			<Button></Button>
		</div>
	)
}

export default Test
