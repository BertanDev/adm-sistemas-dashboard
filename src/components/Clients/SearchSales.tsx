'use client'

import { Search } from 'lucide-react'
import { DateInput } from '../All/DateInput'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { api } from '@/lib/axios/initAxios'
import { getAuthTokenClient } from '@/utils/get-auth-token-client'
import SearchSalesModal from './modals/SearchSalesModal'

export function SearchSales() {
  const [clients, setClients] = useState<{ CODI: number; NOME: string }[]>([])
  const [selectedClient, setSelectedClient] = useState<{
    CODI: number
    NOME: string
  } | null>(null)
  const [clientInput, setClientInput] = useState('')
  const [filteredClients, setFilteredClients] = useState<
    { CODI: number; NOME: string }[]
  >([])
  const [modalOpen, setModalOpen] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const [initialDate, setInitialDate] = useState<Dayjs>(
    dayjs().subtract(30, 'day'),
  )
  const [finishDate, setFinishDate] = useState<Dayjs>(dayjs())

  const handleChangeInitialDate = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = dayjs(e.target.value)
    setInitialDate(selectedDate)
  }

  const handleChangeFinishDate = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = dayjs(e.target.value)
    setFinishDate(selectedDate)
  }

  const handleClientInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setClientInput(value)
    setFilteredClients(
      clients.filter((client) =>
        client.NOME.toLowerCase().includes(value.toLowerCase()),
      ),
    )
  }

  const handleClientSelect = (client: { CODI: number; NOME: string }) => {
    setSelectedClient(client)
    setClientInput(client.NOME)
    setFilteredClients([])
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target as Node)
    ) {
      setFilteredClients([])
    }
  }

  const token = getAuthTokenClient()

  useEffect(() => {
    async function getClients() {
      const response = await api.get('all-clients', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setClients(response.data)
    }

    getClients()
  }, [token])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col p-2 rounded-md w-full">
          <span className="text-gray-900 mb-1 text-xl">
            Produtos vendidos por cliente
          </span>
          <div className="flex flex-row w-full relative" ref={suggestionsRef}>
            <input
              value={clientInput}
              onChange={handleClientInputChange}
              placeholder="Selecione o cliente"
              className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-blue-500 sm:text-sm sm:leading-6"
            />
            <button
              className="p-[5px] ml-2 bg-blue-400 rounded-md text-gray-200"
              onClick={() => setModalOpen(true)}
            >
              <Search size={18} />
            </button>
            {filteredClients.length > 0 && (
              <ul className="absolute z-10 mt-12 bg-white border text-gray-600 border-gray-300 rounded-md shadow-lg w-full max-h-60 overflow-auto">
                {filteredClients.map((client) => (
                  <>
                    <li
                      key={client.CODI}
                      className="p-2 hover:bg-gray-200 cursor-pointer flex flex-col"
                      onClick={() => handleClientSelect(client)}
                    >
                      <span>{client.NOME}</span>
                      <span className="text-gray-400 text-sm">
                        {client.CODI}
                      </span>
                    </li>
                  </>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-6 p-2">
          <div>
            <span className="text-gray-600">Data Inicial</span>
            <DateInput onChange={handleChangeInitialDate} value={initialDate} />
          </div>

          <div>
            <span className="text-gray-600">Data Final</span>
            <DateInput onChange={handleChangeFinishDate} value={finishDate} />
          </div>
        </div>
      </div>
      <SearchSalesModal
        isOpen={modalOpen}
        setOpen={setModalOpen}
        client={selectedClient}
        initialDate={initialDate}
        finishDate={finishDate}
      />
    </>
  )
}
