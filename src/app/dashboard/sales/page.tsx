import { TotalSales } from '@/components/Sales/cards/total-sales'
import { TotalSalesMoney } from '@/components/Sales/cards/total-sales-money'
import SalesPerSeller from '@/components/Sales/graphics/sales-per-seller'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vendas',
}

const Sales = () => {
  return (
    <div className="flex-1 py-10 h-full">
      <main className="flex-1 p-3 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">
          Saiba como estão suas <span className="text-blue-500">Vendas</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <TotalSales />
          <TotalSalesMoney />
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8 mt-8">
          <SalesPerSeller />
        </div>
      </main>
    </div>
  )
}

export default Sales
