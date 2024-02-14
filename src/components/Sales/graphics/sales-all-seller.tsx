'use client'

import { api } from '@/lib/axios/initAxios'
import { dayjsFormatMMMYYYY, getLastTwelveMonths } from '@/utils/dayjsFormatter'
import { getAuthTokenClient } from '@/utils/get-auth-token-client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface SalesAllSellersProps {
  employees: Array<{ CODI: number; NOME: string }>
}

export function SalesAllSellers({ employees }: SalesAllSellersProps) {
  const [sales, setSales] = useState<Array<{ name: 'string'; data: [] }>>([])

  const token = getAuthTokenClient()

  useEffect(() => {
    async function getData() {
      const response = await api.get('/total-sales-seller', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setSales(response.data)
    }

    if (employees) {
      getData()
    }
  }, [employees, token])

  const lastTwelveMonths = dayjsFormatMMMYYYY(getLastTwelveMonths())

  return (
    <>
      <Chart
        options={{
          chart: {
            type: 'line',
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: lastTwelveMonths,
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
        }}
        series={sales}
        type="line"
        height={300}
        width="100%"
      />
    </>
  )
}
