'use client'

import dynamic from 'next/dynamic'

import { api } from '@/lib/axios/initAxios'
import { useState, useEffect } from 'react'
import { dayjsFormatMMMYYYY } from '@/utils/dayjsFormatter'
import { getAuthTokenClient } from '@/utils/get-auth-token-client'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function MovementsLastTwelveMonths() {
  const [financeiro, setFinanceiro] = useState([])
  const [cashAccounts, setCashAccounts] =
    useState<[{ CODI: number; NOME: string }]>()

  const [currentCashAccount, setCurrentCashAccont] = useState(0)

  const token = getAuthTokenClient()

  useEffect(() => {
    async function getFinanceiro() {
      const response = await api.get('/movements-last-twelve-months', {
        params: {
          cont: currentCashAccount,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setFinanceiro(response.data)
    }

    getFinanceiro()
  }, [currentCashAccount, token])

  useEffect(() => {
    async function getAccounts() {
      const response = await api.get('/cash-account', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setCashAccounts(response.data)
    }

    getAccounts()
  }, [token])

  const filteredData = financeiro.filter(
    (item: { ANO: number }) => item.ANO === 2023,
  )

  // Ordenar os dados por mês
  filteredData.sort((a: { MES: number }, b: { MES: number }) => a.MES - b.MES)

  // Criar arrays separados para as categorias e os valores
  const categories = [] as Array<string>
  const values = [] as Array<number>

  filteredData.forEach(
    (item: { MES: number; ANO: number; VALOR_TOTAL: number }) => {
      // Formatar a data para o formato desejado (MM/YYYY)
      const formattedDate = `${String(item.MES).padStart(2, '0')}/${item.ANO}`
      categories.push(formattedDate)

      // Adicionar o valor correspondente
      const roundedValue = parseFloat(item.VALOR_TOTAL.toFixed(2))
      values.push(roundedValue)
    },
  )

  let datesArrayFormatted = dayjsFormatMMMYYYY(categories)

  if (!financeiro || financeiro.length === 0) {
    datesArrayFormatted = ['teste', 'teste']
  }

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:justify-between">
        <h2 className="text-gray-600 font-bold text-lg lg:text-xl">
          Movimento de caixa dos últimos 12 meses
        </h2>
        <div className="relative">
          <select
            className="text-sm float-left appearance-none bg-white border border-blue-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-700 focus:shadow-outline-blue"
            onChange={(e) => setCurrentCashAccont(Number(e.target.value))}
          >
            <option value={0}>Selecione uma conta</option>
            {cashAccounts?.map((cashAccount) => (
              <option key={cashAccount.CODI} value={cashAccount.CODI}>
                {cashAccount.NOME}
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
              enabled: false
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
              name: 'Valor final mês',
              data: values,
            },
          ]}
          type="line"
          width="100%"
          height={300}
        />
      </div>
    </div>
  )
}
