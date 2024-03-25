'use client'

import { api } from '@/lib/axios/initAxios'
import { dayjsFormatMMMYYYY } from '@/utils/dayjsFormatter'
import { getAuthTokenClient } from '@/utils/get-auth-token-client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export function PurchaseAndSales() {
  const [purchase, setPurchase] = useState([])
  const [sales, setSales] = useState([])

  const token = getAuthTokenClient()

  useEffect(() => {
    const getData = async () => {
      const [purchaseResponse, salesResponse] = await Promise.all([
        api.get('/last-twelve-months-purchase', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        api.get('/last-twelve-months-sales', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ])

      setPurchase(purchaseResponse.data)
      setSales(salesResponse.data)
    }

    getData()
  }, [token])

  const salesValuesArray = [] as Array<number>

  if (sales.length > 0) {
    sales.forEach((item: { MES: number; ANO: number; TOTAL: number }) => {
      // Formatar a data para o formato desejado (MM/YYYY)
      salesValuesArray.push(Number(item.TOTAL.toFixed(2)))
    })
  }

  const purchaseDatesArray = [] as Array<string>
  const purchaseValuesArray = [] as Array<number>

  if (purchase.length > 0) {
    purchase.forEach(
      (item: { MES: number; ANO: number; SOMA_TOTAL: number }) => {
        // Formatar a data para o formato desejado (MM/YYYY)
        const formattedDate = `${String(item.MES).padStart(2, '0')}/${item.ANO}`

        // Adicionar a data ao array de datas
        if (!purchaseDatesArray.includes(formattedDate)) {
          purchaseDatesArray.push(formattedDate)
        }

        purchaseValuesArray.push(Number(item.SOMA_TOTAL.toFixed(2)))
      },
    )
  }

  const datesArrayFormatted = dayjsFormatMMMYYYY(purchaseDatesArray)

  return (
    <div className="text-black">
      <Chart
        series={[
          {
            name: 'Compras',
            data: purchaseValuesArray.toReversed(),
          },
          {
            name: 'Vendas',
            data: salesValuesArray.toReversed(),
          },
        ]}
        options={{
          title: {
            text: 'Comparativo Vendas x Compras',
          },
          chart: {
            height: 350,
            type: 'area',
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
          },
          xaxis: {
            categories: datesArrayFormatted.toReversed(),
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm',
            },
          },
        }}
        width="100%"
        height={300}
        type="area"
      />
    </div>
  )
}
