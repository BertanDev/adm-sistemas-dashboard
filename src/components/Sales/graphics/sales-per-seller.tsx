'use client'

import { api } from '@/lib/axios/initAxios'
import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import { dayjsFormatMMMYYYY } from '@/utils/dayjsFormatter'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function SalesPerSeller() {
  const [employees, setEmployees] = useState<[{ CODI: number; NOME: string }]>()
  const [sales, setSales] = useState([])

  const [currentEmployee, setCurrentEmployee] = useState<number | undefined>()

  useEffect(() => {
    async function getSales() {
      if (currentEmployee !== 0) {
        const response = await api.get(`/total-sales-per-seller`, {
          params: {
            func_code: currentEmployee,
          },
        })
        console.log('--->>', response.data)
        setSales(response.data)
      }
    }

    getSales()
  }, [currentEmployee])

  useEffect(() => {
    async function getEmployees() {
      await api
        .get('/employees')
        .then((response) => setEmployees(response.data))
    }

    getEmployees()
  }, [])

  const datesArray = [] as Array<string>
  const countArray = [] as Array<number>

  // Processar os dados e preencher os arrays
  if (sales.length > 0) {
    sales.forEach((item: { MES: number; ANO: number; COUNT: number }) => {
      // Formatar a data para o formato desejado (MM/YYYY)
      const formattedDate = `${String(item.MES).padStart(2, '0')}/${item.ANO}`

      // Adicionar a data ao array de datas
      datesArray.push(formattedDate)

      // Adicionar o valor do COUNT ao array de valores
      countArray.push(item.COUNT)
    })
  }

  const datesArrayFormatted = dayjsFormatMMMYYYY(datesArray)

  return (
    <div className="">
      <div className="flex items-center gap-4 w-full justify-between">
        <h2 className="text-gray-600 font-bold text-xl">
          Vendas por vendedor últimos 12 meses
        </h2>
        <div className="relative">
          <select
            className="text-sm block appearance-none bg-white border border-blue-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-700 focus:shadow-outline-blue"
            onChange={(e) => setCurrentEmployee(Number(e.target.value))}
          >
            <option value={0}>Selecione um vendedor</option>
            {employees?.map((employee) => (
              <option key={employee.CODI} value={employee.CODI}>
                {employee.NOME}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 12l-6-6-1.41 1.41L10 14.83l7.41-7.42L16 6z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="text-black">
        <Chart
          options={{
            chart: {
              type: 'line',
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              categories: datesArrayFormatted,
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
          }}
          series={[
            {
              name: 'Vendas no mês',
              data: countArray,
            },
          ]}
          type="line"
        />
      </div>
    </div>
  )
}
