import { api } from '@/lib/axios/initAxios'
import { getAuthTokenClient } from '@/utils/get-auth-token-client'
import { Dayjs } from 'dayjs'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface AllGroupsProfit {
  initialDate: Dayjs
  finishDate: Dayjs
}

export function AllGroupsProfit({ finishDate, initialDate }: AllGroupsProfit) {
  const [data, setData] = useState<
    Array<{ RECEITA: number; CUSTO: number; LUCRO: number; DESCR: string }>
  >([])

  const token = getAuthTokenClient()

  useEffect(() => {
    async function getData() {
      const response = await api.get('/profit-per-group-product', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          initialDate,
          finishDate,
        },
      })

      const { data } = response

      setData(data.data)
    }

    getData()
  }, [finishDate, initialDate, token])

  const revenue = data ? data.map((item) => item.RECEITA) : []
  const cust = data ? data.map((item) => item.CUSTO) : []
  const profit = data ? data.map((item) => item.LUCRO) : []
  const groups = data ? data.map((item) => item.DESCR) : []

  return (
    <div className="text-black">
      <Chart
        series={[
          {
            name: 'RECEITA',
            data: revenue,
          },
          {
            name: 'CUSTO',
            data: cust,
          },
          {
            name: 'LUCRO',
            data: profit,
          },
        ]}
        options={{
          chart: {
            type: 'bar',
            height: 350,
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0,
                },
              },
            },
          ],
          stroke: {
            show: true,
            width: 12,
            colors: ['transparent'],
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: 50,
            },
          },
          dataLabels: {
            enabled: true,
          },
          xaxis: {
            categories: groups,
            labels: {
              style: {
                fontSize: '12px',
                fontWeight: 700,
                colors: 'black',
              },
            },
            title: {
              text: '',
            },
          },
          fill: {
            opacity: 1,
          },
          legend: {
            position: 'right',
            offsetX: 0,
            offsetY: 50,
          },
        }}
        width="5000px"
        height={300}
        type="bar"
      />
    </div>
  )
}
