import { api } from '@/lib/axios/initAxios'
import { dayjsFormatMMMMYYYY } from '@/utils/dayjsFormatter'
import { differenceBetweenTwoValuesInPercentage } from '@/utils/difference-between-two-values-in-percentage'
import { getAuthTokenServer } from '@/utils/get-auth-token-server'
import { Store } from 'lucide-react'

export async function TotalSales() {
  const token = getAuthTokenServer()

  const [totalSalesCurrentMonthResponse, totalSalesPreviousMonthResponse] =
    await Promise.all([
      api.get('/sales-on-current-month', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      api.get('/sales-on-previous-month', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ])

  const { TOTAL: totalSalesCurrentMonth } = totalSalesCurrentMonthResponse.data
  const { TOTAL: totalSalesPreviousMonth } =
    totalSalesPreviousMonthResponse.data

  const percentage = differenceBetweenTwoValuesInPercentage({
    firstValue: totalSalesCurrentMonth,
    secondValue: totalSalesPreviousMonth,
  })

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-blue-400">Vendas no mês atual</h2>
        <Store className="text-blue-400" size={21} />
      </div>
      <div className="flex items-end mt-2 gap-2">
        <span className="text-blue-600 font-bold text-3xl">
          {totalSalesCurrentMonth}
        </span>
        <p className="text-gray-400 font-bold">em {dayjsFormatMMMMYYYY()}</p>
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
