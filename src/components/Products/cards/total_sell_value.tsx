import { api } from '@/lib/axios/initAxios'
import { getCurrentDate_DD_MM_YYYY } from '@/utils/dayjsFormatter'
import { formatMoney } from '@/utils/formatMoney'
import { getAuthTokenServer } from '@/utils/get-auth-token-server'
import { ScanBarcode } from 'lucide-react'

export async function TotalSellValue() {
  const token = getAuthTokenServer()

    const response = await api.get('/total-products-value', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

  const { PRECO_VISTA, PRECO_PRAZO } = response.data

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-blue-400">Valor de venda do meu estoque</h2>
        <ScanBarcode className="text-blue-400" size={21} />
      </div>
      <div className="flex items-end mt-2 gap-2">
        <span className="text-blue-600 font-bold text-3xl">
          {formatMoney(PRECO_VISTA)}
        </span>
        <p className="text-gray-400 font-bold">em {getCurrentDate_DD_MM_YYYY()}</p>
      </div>
      <div className="flex mt-4 gap-2">
        <span
          className={`font-bold text-blue-400`}
        >
          {formatMoney(PRECO_PRAZO)}
        </span>
        <p className="text-gray-400 font-bold">no preço a prazo</p>
      </div>
    </div>
  )
}
