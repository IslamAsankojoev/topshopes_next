import { useState } from 'react'

type Order = 'asc' | 'desc'

const useSorter = () => {
	const [orderBy, setOrderBy] = useState(null)
	const [order, setOrder] = useState<Order>(null)

	const handleSorting = (property: string) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const ordering = orderBy ? `${order === 'asc' ? '' : '-'}${orderBy}` : null

	return { orderBy, order, ordering, handleSorting }
}

export default useSorter
