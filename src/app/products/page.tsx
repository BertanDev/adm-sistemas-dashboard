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
      </main>
    </div>
  )
}

export default Products
