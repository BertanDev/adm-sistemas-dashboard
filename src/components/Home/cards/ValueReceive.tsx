import { api } from '@/lib/axios/initAxios'
import { dayjsFormatMMMMYYYY } from '@/utils/dayjsFormatter'
import { formatMoney } from '@/utils/formatMoney'
import { getAuthTokenServer } from '@/utils/get-auth-token-server'
import { ArrowUpCircle } from 'lucide-react'

export async function ValueReceive() {
  const token = getAuthTokenServer()

  const [amountToReceiveResponse, amountToReceiveCurrrentMonthResponse] =
    await Promise.all([
      api.get('/total-receivable', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      api.get('/total-receivable-current-month', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ])

  const { TOTAL: amountToReceive } = amountToReceiveResponse.data
  const { TOTAL: amountToReceiveCurrrentMonth } =
    amountToReceiveCurrrentMonthResponse.data

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="flex items-center">
        <h2 className="text-xl font-bold text-blue-400">Valor a receber</h2>
        <ArrowUpCircle className="text-green-600 ml-3" size={22} />
      </div>
      <p className="mt-4 text-2xl text-gray-400 font-bold">
        <span className="text-sm text-gray-400 mr-1">R$</span>
        {formatMoney(amountToReceive)}
      </p>
      <div className="flex mt-4 gap-2 items-end">
        <p className="text-gray-400">em {dayjsFormatMMMMYYYY()}:</p>
        <span className="text-green-600 text-xl">
          {formatMoney(amountToReceiveCurrrentMonth)}
        </span>
      </div>
    </div>
  )
}
