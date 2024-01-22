import { api } from '@/lib/axios/initAxios'
import { dayjsFormatMMMMYYYY } from '@/utils/dayjsFormatter'
import { formatMoney } from '@/utils/formatMoney'
import { getAuthTokenServer } from '@/utils/get-auth-token-server'
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react'

interface CashBalanceProps {
  CODI: number
  NOME: string
  SALD: number
}

export async function CashBalance({ CODI, NOME, SALD }: CashBalanceProps) {
  const token = getAuthTokenServer()

  const [totalCreditCurrentMonthResponse, totalDebitCurrentMonthResponse] =
    await Promise.all([
      api.get('/total-credit-movements-current-month', {
        params: {
          acc: CODI,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      api.get('/total-debit-movements-current-month', {
        params: {
          acc: CODI,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ])

  const { TOTAL: totalCreditCurrentMonth } =
    totalCreditCurrentMonthResponse.data
  const { TOTAL: totalDebitCurrentMonth } = totalDebitCurrentMonthResponse.data

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <p className="text-gray-400 font-bold text-lg">Conta - {NOME}</p>
      <div className="flex gap-1 mt-2 items-end">
        <p className="text-gray-600 font-bold">Saldo atual: R$</p>
        <span
          className={`${
            SALD >= 0 ? 'text-green-600' : 'text-red-600'
          } font-bold text-xl`}
        >
          {formatMoney(SALD)}
        </span>
      </div>
      <div className="flex mt-4 gap-2">
        <p className="text-gray-400 font-bold">Em {dayjsFormatMMMMYYYY()}:</p>
        <div className="flex items-center gap-1">
          <span className="text-green-400 font-bold">
            {formatMoney(totalCreditCurrentMonth)}
          </span>
          <ArrowUpCircle className="text-green-500" size={18} />
        </div>

        <div className="flex items-center gap-1">
          <span className="text-red-400 font-bold">
            {formatMoney(totalDebitCurrentMonth)}
          </span>
          <ArrowDownCircle className="text-red-400" size={18} />
        </div>
      </div>
    </div>
  )
}
