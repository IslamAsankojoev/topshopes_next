import { FC, useEffect, useState } from 'react'
// import ReactApexChart from 'react-apexcharts'
import dynamic from 'next/dynamic'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

type ChartData = {
	data: any
}

const ApexChart: FC<ChartData> = ({ data }) => {
	const [client, setClient] = useState(false)

	const options = {
		chart: {
			id: 'basic-bar',
		},
		xaxis: {
			categories: data?.map((item) => item.day),
		},
		markers: {
			size: 0,
		},
	}

	const series = [
		{
			name: 'Sales',
			data: data?.map((item) => item.total_amount),
		},
	]

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setClient(true)
		}
	}, [])

	return client ? (
		<ReactApexChart
			options={options}
			series={series}
			type="area"
			height={450}
		/>
	) : (
		<div>Loading...</div>
	)
}

export default ApexChart
