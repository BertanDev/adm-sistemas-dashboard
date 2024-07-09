import { SearchSales } from '@/components/Clients/SearchSales'
import { BuyThisMonth } from '@/components/Clients/cards/BuyThisMonth'
import { ClientsInDebit } from '@/components/Clients/cards/ClientsInDebit'
import { TotalActiveClients } from '@/components/Clients/cards/TotalActiveClients'
import { ClientsPerState } from '@/components/Clients/graphics/ClientsPerState'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clientes',
}

const Clients = () => {
  return (
    <div className="flex-1 py-10 h-full">
      <main className="flex-1 p-3 bg-gray-100">
        <h1 className="text-3xl font-bold mb-2 text-blue-400">
          Análise de seus <span className="text-blue-500">Clientes</span>
        </h1>

        <div className="grid grid-cols-1 min-[1110px]:grid-cols-2 2xl:grid-cols-3 gap-8">
          <BuyThisMonth />
          <TotalActiveClients />
          <ClientsInDebit />
        </div>

        <div className="grid grid-cols-1 min-[1110px]:grid-cols-2 2xl:grid-cols-3 gap-8 mt-8">
          <ClientsPerState />
          <SearchSales />
        </div>
      </main>
    </div>
  )
}

export default Clients
