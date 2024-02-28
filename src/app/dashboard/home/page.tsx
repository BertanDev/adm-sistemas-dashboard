import { AmountToPay } from '@/components/Home/cards/AmountToPay'
import { Balance } from '@/components/Home/cards/Balance'
import { PayableByDate } from '@/components/Home/cards/PayableByDate'
import { ReceivableByDate } from '@/components/Home/cards/ReceivableByDate'
import { ValueReceive } from '@/components/Home/cards/ValueReceive'
import { ABCClients } from '@/components/Home/graphics/abc-clients'
import { ABCSuppliers } from '@/components/Home/graphics/abc-suppliers'
import { PurchaseAndSales } from '@/components/Home/graphics/purchase-and-sales'

const Home = () => {
  return (
    <div className="flex w-full h-screen py-10 mb-16">
      <main className="flex-1 p-3 bg-gray-100 w-full">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">
          Bem-vindo ao <span className="text-blue-500">ADM Analytics</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ValueReceive />

          <AmountToPay />

          <Balance />
        </div>

        <div className="flex flex-row flex-wrap gap-12 mt-12 w-11/12 sm:mb-0 mb-9">
          <ReceivableByDate />
          <PayableByDate />
          <div className="flex flex-col gap-11 sm:gap-1">
            <ABCSuppliers />
            <hr className="border-t-2" />
            <ABCClients />
          </div>
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8 mt-8">
          <PurchaseAndSales />
          {/* <ProfitGroupProducts /> */}
        </div>
      </main>
    </div>
  )
}

export default Home
