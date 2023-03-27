import { FC, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { useRouter } from 'next/router'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

type ChartData = {
	series: {
		name: string
		data: number[]
	}[]
	categories: any
}

const ApexChart: FC<ChartData> = ({ series, categories }) => {
	const [client, setClient] = useState(false)
	const router = useRouter()

	const options: ApexOptions = {
		chart: {
			id: 'basic-bar',
			// stacked: true,
		},
		colors: ['#fc5a03', '#1ddb5f'],
		xaxis: {
			type: 'datetime',
			categories: categories,
		},
		fill: {
			type: 'gradient',
			gradient: {
				shadeIntensity: 1,
				inverseColors: false,
				opacityFrom: 0.45,
				opacityTo: 0.05,
				stops: [20, 100, 100, 100],
			},
		},
	}

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
