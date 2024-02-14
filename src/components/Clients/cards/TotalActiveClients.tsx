import { api } from '@/lib/axios/initAxios'
import { dayjsFormatMMMMYYYY } from '@/utils/dayjsFormatter'
import { getAuthTokenServer } from '@/utils/get-auth-token-server'
import { Users } from 'lucide-react'

export async function TotalActiveClients() {
    const token = getAuthTokenServer()

    const [totalRegisteredClients, totalRegisteredClientsInThisMonth] =
    await Promise.all([
      api.get('/total-registered-client', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      api.get('/total-new-clients-in-this-month', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ])

  const { TOTAL: totalClients } =
  totalRegisteredClients.data
  const { TOTAL: totalClientsThisMonth } = totalRegisteredClientsInThisMonth.data

    return (
        <div className="bg-white p-6 rounded-md shadow-md">
            <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-blue-400">
                Clientes cadastrados ativos
                </h2>
                <Users className="text-blue-400" size={21} />
            </div>
            <div className="flex items-end mt-2 gap-2">
                <p className="text-gray-400 font-bold">
                <span className="text-blue-600 font-bold text-3xl mr-2">
                {totalClients}
                </span>
                clientes
                </p>
            </div>
            <div className="flex mt-4 gap-2">
                <span className='font-semibold text-gray-800'
                >
                + {totalClientsThisMonth}
                </span>
                <p className="text-gray-400 font-bold">cadastrados em {dayjsFormatMMMMYYYY()}</p>
            </div>
        </div>
    )
}