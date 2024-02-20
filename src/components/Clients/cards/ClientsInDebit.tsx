import { api } from '@/lib/axios/initAxios'
import { getAuthTokenServer } from '@/utils/get-auth-token-server'
import { Hand } from 'lucide-react'

export async function ClientsInDebit() {
  const token = getAuthTokenServer()

  const [totalClientsLate, countPaidInThisMonth] = await Promise.all([
    api.get('/total-clients-with-late-bills', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    api.get('/count-paid-this-month', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  ])

  const { TOTAL: clientsLate } = totalClientsLate.data
  const { TOTAL: countPaidThisMonth } = countPaidInThisMonth.data

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-blue-400">
          Clientes com títulos atrasados
        </h2>
        <Hand className="text-blue-400" size={21} />
      </div>
      <div className="flex items-end mt-2 gap-2">
        <p className="text-gray-400 font-bold">
          <span className="text-blue-600 font-bold text-3xl mr-2">
            {clientsLate}
          </span>
          clientes
        </p>
      </div>
      <div className="flex mt-4 gap-2">
        <span className="font-semibold text-gray-800">
          + {countPaidThisMonth}
        </span>
        <p className="text-gray-400 font-bold">títulos baixados este mês</p>
      </div>
    </div>
  )
}
