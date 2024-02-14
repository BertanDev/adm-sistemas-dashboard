import { BuyThisMonth } from '@/components/Clients/cards/BuyThisMonth'
import { ClientsInDebit } from '@/components/Clients/cards/ClientsInDebit'
import { TotalActiveClients } from '@/components/Clients/cards/TotalActiveClients'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clientes',
}

const Clients = () => {
  return (
    <div className="flex w-full h-screen">
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">
          Análise de seus <span className="text-blue-500">Clientes</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BuyThisMonth />
          <TotalActiveClients />
          <ClientsInDebit />
        </div>
      </main>
    </div>
  )
}

export default Clients
