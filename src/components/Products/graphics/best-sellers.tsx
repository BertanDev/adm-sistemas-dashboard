'use client'

import dynamic from 'next/dynamic'

import {
  dayjsFormatMMMMYYYY,
  dayjsFormatPreviousMMMMYYYY,
} from '@/utils/dayjsFormatter'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios/initAxios'
import { getAuthTokenClient } from '@/utils/get-auth-token-client'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function BestSellers() {
  const [products, setProducts] = useState<
    Array<{ DESCR: string; TOTAL_ATUAL: string; TOTAL_MES_ANTERIOR: string }>
  >([])

  const token = getAuthTokenClient()

  useEffect(() => {
    async function getData() {
      const response = await api.get(`/top-ten-best-sellers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setProducts(response.data)
    }

    getData()
  }, [])

  const categories = products.map((product) => product.DESCR)

  const valueCurrentMonth = products.map((product) => product.TOTAL_ATUAL)
  const valuePreviousMonth = products.map(
    (product) => product.TOTAL_MES_ANTERIOR,
  )

  const values = [
    {
      name: dayjsFormatMMMMYYYY(),
      data: valueCurrentMonth,
    },
    {
      name: dayjsFormatPreviousMMMMYYYY(),
      data: valuePreviousMonth,
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
                horizontal: true,
                columnWidth: '55%',
              },
            },
            stroke: {
              show: true,
              width: 4,
              colors: ['transparent'],
            },
            yaxis: {
              labels: {
                style: {
                  fontSize: '12px',
                  fontWeight: 700,
                },
              },
            },
            xaxis: {
              categories,
              labels: {
                style: {
                  fontSize: '12px',
                  fontWeight: 700,
                },
              },
              title: {
                text: 'Quantidade',
              },
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
          height={400}
          width="100%"
        />
      </div>
    </div>
  )
}
