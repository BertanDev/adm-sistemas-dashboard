import { api } from '@/lib/axios/initAxios'
import { formatMoney } from '@/utils/formatMoney'
import { getAuthTokenServer } from '@/utils/get-auth-token-server'

// type ReceivableData = {
//   '0 a 5 dias': number
//   '6 a 10 dias': number
//   '11 a 15 dias': number
//   '16 a 20 dias': number
//   '21 a 25 dias': number
//   '26 a 30 dias': number
//   'Acima de 30 dias': number
// }

// interface ReceivableByDateProps {
//   data: ReceivableData
// }

export async function ReceivableByDate() {
  const token = getAuthTokenServer()

  const response = await api.get('/total-by-day-range', {
    params: {
      type: 'tr',
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const { data } = response

  const renderData = () => {
    // Calcular o valor total
    const total = Object.values(data).reduce(
      (acc: number, curr) => acc + curr,
      0,
    )

    return Object.entries(data).map(([chave, valor]) => {
      // Calcular a porcentagem
      const porcentagem = ((valor / total) * 100).toFixed(2).padStart(5, '0')

      return (
        <div
          key={chave}
          className="flex py-2 text-gray-600 font-semibold text-sm"
        >
          <span className="pl-2 pr-2 w-32">{chave}</span>
          <span className="ml-4 pr-2 w-[165px]">R${formatMoney(valor)}</span>
          <span className="ml-4">{porcentagem}%</span>
        </div>
      )
    })
  }

  return (
    <div>
      <div className="w-[400px] flex justify-between">
        <span className="px-2 bg-green-200 rounded-2xl border-2 border-green-300">
          Período
        </span>
        <span className="px-2 bg-green-200 rounded-2xl border-2 border-green-300">
          Valor a receber
        </span>
        <span className="px-2 bg-green-200 rounded-2xl border-2 border-green-300">
          Porcentagem
        </span>
      </div>
      {renderData()}
    </div>
  )
}
