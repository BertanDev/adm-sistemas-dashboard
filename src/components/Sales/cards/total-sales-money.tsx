import { api } from '@/lib/axios/initAxios'
import { dayjsFormatMMMMYYYY } from '@/utils/dayjsFormatter'
import { differenceBetweenTwoValuesInPercentage } from '@/utils/difference-between-two-values-in-percentage'
import { formatMoney } from '@/utils/formatMoney'
import { getAuthTokenServer } from '@/utils/get-auth-token-server'
import { BadgeDollarSign } from 'lucide-react'

export async function TotalSalesMoney() {
  const token = getAuthTokenServer()

  const [
    totalSalesCurrentMonthMoneyResponse,
    totalSalesPreviousMonthMoneyResponse,
  ] = await Promise.all([
    api.get('/sales-on-current-month-money', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    api.get('/sales-on-previous-month-money', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  ])

  const { TOTAL: totalSalesCurrentMonthMoney } =
    totalSalesCurrentMonthMoneyResponse.data
  const { TOTAL: totalSalesPreviousMonthMoney } =
    totalSalesPreviousMonthMoneyResponse.data

  const percentage = differenceBetweenTwoValuesInPercentage({
    firstValue: totalSalesCurrentMonthMoney,
    secondValue: totalSalesPreviousMonthMoney,
  })

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-blue-400">
          Receita de vendas no mês atual
        </h2>
        <BadgeDollarSign className="text-blue-400" size={21} />
      </div>
      <div className="flex items-end mt-2 gap-2">
        <p className="text-gray-400 font-bold">
          R${' '}
          <span className="text-blue-600 font-bold text-3xl mr-2">
            {formatMoney(totalSalesCurrentMonthMoney)}
          </span>
          em {dayjsFormatMMMMYYYY()}
        </p>
      </div>
      <div className="flex mt-4 gap-2">
        <span
          className={`${
            percentage >= 0 ? 'text-green-400' : 'text-red-400'
          } font-bold`}
        >
          {percentage}%
        </span>
        <p className="text-gray-400 font-bold">em comparação ao mês passado</p>
      </div>
    </div>
  )
}
