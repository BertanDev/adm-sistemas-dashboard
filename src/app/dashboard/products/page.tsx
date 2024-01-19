import BestSellers from '@/components/Products/graphics/BestSellers'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Produtos',
}

const Products = () => {
  return (
    <div className="flex w-full h-screen">
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">
          Visão geral do seu <span className="text-blue-500">Estoque</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <BestSellers />
        </div>
      </main>
    </div>
  )
}

export default Products
