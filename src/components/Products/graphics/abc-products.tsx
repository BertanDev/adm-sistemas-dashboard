'use client'

import { api } from '@/lib/axios/initAxios'
import { getAuthTokenClient } from '@/utils/get-auth-token-client'
import dynamic from 'next/dynamic'
import { ChangeEvent, useEffect, useState } from 'react'
import { DateInput } from '@/components/All/DateInput'
import dayjs, { Dayjs } from 'dayjs'
import { Search } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import ProductsModal from '../modals/products-modal'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Product {
  CODI: number
  DESCR: string
  TOTAL: number
  PRECO_MEDIO: number
  QTD: number
}

export interface ProductABC extends Product {
  Percentual: number
  PercentualAcumulado: number
  TotalAcumulado: number
  Classe: string
}

export function ABCProducts() {
  const [data, setData] = useState<Array<Product>>([])
  const [modalOpen, setModalOpen] = useState(false)

  const [initialDate, setInitialDate] = useState<Dayjs>(
    dayjs().subtract(30, 'day'),
  )
  const [finishDate, setFinishDate] = useState<Dayjs>(dayjs())

  const [valueA, setValueA] = useState(80)
  const [valueB, setValueB] = useState(15)
  const [valueC, setValueC] = useState(5)

  const token = getAuthTokenClient()

  const handleChangeInitialDate = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = dayjs(e.target.value)
    setInitialDate(selectedDate)
  }

  const handleChangeFinishDate = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = dayjs(e.target.value)
    setFinishDate(selectedDate)
  }

  useEffect(() => {
    const getGraphicData = async () => {
      if (dayjs(initialDate).isAfter(dayjs(finishDate))) {
        toast.error('Verifique as datas!')
        return
      }

      const response = await api.get('/abc-products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          initialDate,
          finishDate,
        },
      })

      setData(response.data)
    }

    getGraphicData()
  }, [initialDate, finishDate, token])

  const productsOrdenados = [...data].sort((a, b) => b.TOTAL - a.TOTAL)

  const totalGeral = data.reduce((total, product) => total + product.TOTAL, 0)

  let percentualAcumulado = 0
  let totalAcumulado = 0

  const productsABC: ProductABC[] = productsOrdenados.map((product) => {
    const percentual = (product.TOTAL / totalGeral) * 100
    percentualAcumulado += percentual
    totalAcumulado += product.TOTAL

    let classe = ''
    if (percentualAcumulado <= valueA) {
      classe = 'A'
    } else if (percentualAcumulado <= 100 - valueC) {
      classe = 'B'
    } else {
      classe = 'C'
    }

    return {
      ...product,
      Percentual: percentual,
      PercentualAcumulado: percentualAcumulado,
      TotalAcumulado: totalAcumulado,
      Classe: classe,
    }
  })

  const countA = productsABC.filter((item) => item.Classe === 'A')
  const countB = productsABC.filter((item) => item.Classe === 'B')
  // const countC = productsABC.filter((item) => item.Classe === 'C')

  const countAPercent = (countA.length * 100) / productsABC.length
  const countBPercent = (countB.length * 100) / productsABC.length
  // const countCPercent = (countC.length * 100) / productsABC.length

  return (
    <>
      <Toaster />
      <div className="flex gap-1 sm:gap-4 sm:flex-row flex-col">
        <div>
          <Chart
            options={{
              chart: {
                type: 'area',
                height: 350,
                zoom: {
                  enabled: false,
                },
              },
              xaxis: {
                categories: [
                  0,
                  `${Number(countAPercent).toFixed(2)}%`,
                  `${(Number(countAPercent) + Number(countBPercent)).toFixed(
                    2,
                  )}%`,
                  `${100}%`,
                ],
                title: {
                  text: '% Produtos',
                  style: {
                    fontSize: '12px',
                    fontWeight: 600,
                  },
                },
                labels: {
                  formatter: (val) => (val === null ? '' : val),
                },
              },
              yaxis: {
                title: {
                  text: '% Receita',
                  style: {
                    fontSize: '12px',
                    fontWeight: 600,
                  },
                },
                max: 100,
                tickAmount: 5,
              },
              dataLabels: {
                enabled: true,
                textAnchor: 'middle',
              },
            }}
            series={[
              {
                name: 'Receita (%)',
                data: [0, valueA, 100 - valueC, 100],
              },
            ]}
            width={230}
            height={150}
            type="area"
          />
        </div>
        <div>
          <p className="text-md font-semibold text-gray-800">
            Curva ABC Produtos (Receita)
          </p>
          <div className="flex items-center gap-2 mt-4">
            <DateInput onChange={handleChangeInitialDate} value={initialDate} />
            <DateInput onChange={handleChangeFinishDate} value={finishDate} />
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div>
              <span className="font-semibold text-gray-700">A: </span>
              <input
                className="text-center font-semibold text-gray-600 w-9 px-1 py-1 text-sm border rounded-md outline-none focus:ring focus:border-blue-300"
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                value={valueA}
                onChange={(e) => {
                  const inputValue = e.target.value
                  const newValue =
                    inputValue === ''
                      ? ''
                      : (Math.max(
                          1,
                          Math.min(99, parseInt(inputValue, 10)),
                        ) as number)
                  setValueA(Number(newValue))
                }}
              />
            </div>

            <div>
              <span className="font-semibold text-gray-700">B: </span>
              <input
                className="text-center font-semibold text-gray-600 w-9 px-1 py-1 text-sm border rounded-md outline-none focus:ring focus:border-blue-300"
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                value={valueB}
                onChange={(e) => {
                  const inputValue = e.target.value
                  const newValue =
                    inputValue === ''
                      ? ''
                      : (Math.max(
                          1,
                          Math.min(99, parseInt(inputValue, 10)),
                        ) as number)
                  setValueB(Number(newValue))
                }}
              />
            </div>

            <div>
              <span className="font-semibold text-gray-700">C: </span>
              <input
                className="text-center font-semibold text-gray-600 w-9 px-1 py-1 text-sm border rounded-md outline-none focus:ring focus:border-blue-300"
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                value={valueC}
                onChange={(e) => {
                  const inputValue = e.target.value
                  const newValue =
                    inputValue === ''
                      ? ''
                      : (Math.max(
                          1,
                          Math.min(99, parseInt(inputValue, 10)),
                        ) as number)
                  setValueC(Number(newValue))
                }}
              />
            </div>

            <button
              className="p-[5px] ml-1 bg-blue-400 rounded-md text-gray-200"
              onClick={() => setModalOpen(true)}
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>
      <ProductsModal
        isOpen={modalOpen}
        setOpen={setModalOpen}
        data={productsABC}
      />
    </>
  )
}
