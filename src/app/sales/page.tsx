import { TotalSales } from '@/components/Sales/cards/total-sales'
import { TotalSalesMoney } from '@/components/Sales/cards/total-sales-money'
import SalesPerSeller from '@/components/Sales/graphics/sales-per-seller'

const Sales = () => {
  return (
    <div className="flex w-full h-screen">
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">
          Saiba como estão suas <span className="text-blue-500">Vendas</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <TotalSales />
          <TotalSalesMoney />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <SalesPerSeller />
        </div>
      </main>
    </div>
  )
}

export default Sales
