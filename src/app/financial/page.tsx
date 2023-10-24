import { CashBalance } from '@/components/Financial/cards/CashBalance'
import MovementsLastTwelveMonths from '@/components/Financial/graphics/movements-last-twelve-months'
import { api } from '@/lib/axios/initAxios'

const Financial = async () => {
  const response = await api.get('/cash-account')

  const data = response.data as Array<{
    CODI: number
    NOME: string
    SALD: number
  }>

  return (
    <div className="flex w-full h-screen">
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">
          Sua análise <span className="text-blue-500">Financeira</span>
        </h1>
        <div className="grid grid-cols-1 min-[1110px]:grid-cols-2 2xl:grid-cols-3 gap-8">
          {data.map((item) => {
            return (
              <CashBalance
                key={item.CODI}
                CODI={item.CODI}
                NOME={item.NOME}
                SALD={item.SALD}
              />
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <MovementsLastTwelveMonths />
        </div>
      </main>
    </div>
  )
}

export default Financial
