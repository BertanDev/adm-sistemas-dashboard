import { api } from '@/lib/axios/initAxios'
import { dayjsFormatMMMMYYYY } from '@/utils/dayjsFormatter'
import { formatMoney } from '@/utils/formatMoney'
import { getAuthTokenServer } from '@/utils/get-auth-token-server'
import { ArrowDownUp } from 'lucide-react'

export async function Balance() {
  const token = getAuthTokenServer()

  const [totalBalanceResponse, totalBalanceCurrrentMonthResponse] =
    await Promise.all([
      api.get('/total-balance', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      api.get('/total-balance-current-month', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ])

  const { TOTAL: totalBalance } = totalBalanceResponse.data
  const { TOTAL: totalBalanceCurrrentMonth } =
    totalBalanceCurrrentMonthResponse.data

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="flex items-center">
        <h2 className="text-xl font-bold text-blue-400">Saldo de títulos</h2>
        <ArrowDownUp className="text-blue-400 ml-3" size={22} />
      </div>
      <p className="mt-4 text-2xl text-green-500 font-bold">
        <span
          className={`${
            totalBalance >= 0 ? 'text-green-500' : 'text-red-500'
          } text-sm mr-1`}
        >
          R$
        </span>
        <span
          className={`${totalBalance >= 0 ? 'text-green-500' : 'text-red-500'}`}
        >
          {formatMoney(totalBalance)}
        </span>
      </p>
      <div className="flex mt-4 gap-2 items-end">
        <p className="text-gray-400">em {dayjsFormatMMMMYYYY()}:</p>
        <span
          className={`${
            totalBalanceCurrrentMonth >= 0 ? 'text-green-600' : 'text-red-600'
          } text-xl`}
        >
          {formatMoney(totalBalanceCurrrentMonth)}
        </span>
      </div>
    </div>
  )
}
