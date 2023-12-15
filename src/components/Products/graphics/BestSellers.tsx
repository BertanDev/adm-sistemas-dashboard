'use client'

import dynamic from 'next/dynamic'

import {
  dayjsFormatMMMMYYYY,
  dayjsFormatPreviousMMMMYYYY,
} from '@/utils/dayjsFormatter'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function BestSellers() {
  const products = [
    'Arruela mecânica',
    'Jogo de chave',
    'Martelo',
    'Chave de fenda',
    'Parafuso',
    'Furadeira',
    'Serra elétrica',
    'Alicate',
    'Lixadeira',
    'Nível a laser',
  ]

  const values = [
    {
      name: dayjsFormatMMMMYYYY(),
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 100],
    },
    {
      name: dayjsFormatPreviousMMMMYYYY(),
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 27],
    },
  ]

  return (
    <div className="">
      <div className="flex items-center gap-4 w-full justify-between">
        <h2 className="text-gray-600 font-bold text-xl">
          Mais vendidos em {dayjsFormatMMMMYYYY()}
        </h2>
      </div>
      <div className="text-black">
        <Chart
          options={{
            chart: {
              type: 'bar',
            },
            dataLabels: {
              enabled: false,
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
              },
            },
            stroke: {
              show: true,
              width: 4,
              colors: ['transparent'],
            },
            yaxis: {
              title: {
                text: 'Quantidade',
              },
            },
            xaxis: {
              categories: products,
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
          }}
          series={values}
          type="bar"
          width={900}
          height={400}
        />
      </div>
    </div>
  )
}
