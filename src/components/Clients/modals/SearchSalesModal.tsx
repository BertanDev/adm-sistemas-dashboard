'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Dayjs } from 'dayjs'
import { api } from '@/lib/axios/initAxios'
import { getAuthTokenClient } from '@/utils/get-auth-token-client'
import { dayjsFormatExtenso, daysjFormatDDMMYYYY } from '@/utils/dayjsFormatter'
import { formatMoney } from '@/utils/formatMoney'

interface SearchSalesModalProps {
  isOpen: boolean
  setOpen: (arg: boolean) => void
  client: { CODI: number; NOME: string } | null
  initialDate: Dayjs
  finishDate: Dayjs
}

interface SalesData {
  CODI: number
  DATA: string
  DESCR: string
  PREC_VENDA1: number
  QTD: number
}

export default function SearchSalesModal({
  isOpen,
  setOpen,
  client,
  initialDate,
  finishDate,
}: SearchSalesModalProps) {
  const [data, setData] = useState<SalesData[]>([])

  const cancelButtonRef = useRef(null)

  const token = getAuthTokenClient()

  useEffect(() => {
    async function getData() {
      const response = await api.get('/products-per-client', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          initialDate,
          finishDate,
          client: client?.CODI,
        },
      })

      setData(response.data)
    }

    getData()
  }, [token, client?.CODI, initialDate, finishDate])

  const groupedData = data?.reduce(
    (acc: { [date: string]: SalesData[] }, item) => {
      if (!item) return acc // Verificação para evitar item null ou undefined
      const date = item.DATA
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(item)
      return acc
    },
    {},
  )

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-20"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative w-full sm:w-auto bg-white rounded-lg shadow-xl">
              <div className="p-4 sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      Produtos Vendidos para{' '}
                      <span className="text-gray-600">{client?.NOME}</span>
                    </Dialog.Title>
                    <div className="flex">
                      <span className="text-gray-600">Período: </span>
                      <span className="text-gray-800">
                        {daysjFormatDDMMYYYY(initialDate)} à{' '}
                        {daysjFormatDDMMYYYY(finishDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-5 sm:p-6 bg-white max-h-96 overflow-y-auto">
                {Object.entries(groupedData).map(([date, items]) => (
                  <div key={date} className="mb-4">
                    <h4 className="text-lg font-medium text-gray-800">
                      {dayjsFormatExtenso(date)}
                    </h4>
                    <ul>
                      {items.map((item) => (
                        <li
                          key={item.CODI}
                          className="p-2 border-b border-gray-200"
                        >
                          <p className="text-sm text-gray-600">
                            {item.CODI} - {item.DESCR}
                          </p>
                          <p className="text-sm text-gray-500">
                            Quantidade: {item.QTD}
                          </p>
                          <p className="text-sm text-gray-500">
                            Preço unitário: R$ {formatMoney(item.PREC_VENDA1)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="p-2 sm:p-3 bg-gray-50 flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center w-full sm:w-auto rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3"
                  onClick={() => setOpen(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
