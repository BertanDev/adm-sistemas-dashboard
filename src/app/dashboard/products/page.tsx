import { TotalCustValue } from '@/components/Products/cards/total_cust_value'
import { TotalSellValue } from '@/components/Products/cards/total_sell_value'
import { ABCProducts } from '@/components/Products/graphics/abc-products'
import BestSellers from '@/components/Products/graphics/best-sellers'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Produtos',
}

const Products = () => {
  return (
    <div className="flex-1 py-10 h-full">
      <main className="flex-1 p-3 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">
          Visão geral do seu <span className="text-blue-500">Estoque</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <TotalCustValue />
          <TotalSellValue />
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8 mt-8">
          <BestSellers />
          <ABCProducts />
        </div>
      </main>
    </div>
  )
}

export default Products
