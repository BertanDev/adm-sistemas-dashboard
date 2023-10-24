import { api } from '@/lib/axios/initAxios'
import { dayjsFormatMMMMYYYY } from '@/utils/dayjsFormatter'
import { formatMoney } from '@/utils/formatMoney'
import { ArrowDownCircle } from 'lucide-react'

export async function AmountToPay() {
  const [amountToPayResponse, amountToPayCurrrentMonthResponse] =
    await Promise.all([
      api.get('/total-to-pay'),
      api.get('/total-to-pay-current-month'),
    ])

  const { TOTAL: amountToPay } = amountToPayResponse.data
  const { TOTAL: amountToPayCurrrentMonth } =
    amountToPayCurrrentMonthResponse.data

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="flex items-center">
        <h2 className="text-xl font-bold text-blue-400">Valor a pagar</h2>
        <ArrowDownCircle className="text-red-600 ml-3" size={22} />
      </div>
      <p className="mt-4 text-2xl text-gray-400 font-bold">
        <span className="text-sm text-gray-400 mr-1">R$</span>
        {formatMoney(amountToPay)}
      </p>
      <div className="flex mt-4 gap-2 items-end">
        <p className="text-gray-400">em {dayjsFormatMMMMYYYY()}:</p>
        <span className="text-red-600 text-xl">
          {formatMoney(amountToPayCurrrentMonth)}
        </span>
      </div>
    </div>
  )
}
