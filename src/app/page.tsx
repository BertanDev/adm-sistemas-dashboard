import { Stafftable } from '@/components/Home/StaffTable'
import { AmountToPay } from '@/components/Home/cards/AmountToPay'
import { Balance } from '@/components/Home/cards/Balance'
import { ValueReceive } from '@/components/Home/cards/ValueReceive'

const Home = () => {
  return (
    <div className="flex w-full h-screen">
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">
          Bem-vindo ao <span className="text-blue-500">ADM Analytics</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ValueReceive />

          <AmountToPay />

          <Balance />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <Stafftable />
        </div>
      </main>
    </div>
  )
}

export default Home
