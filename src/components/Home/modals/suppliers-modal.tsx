import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FornecedorABC } from '../graphics/abc-suppliers'
import { formatMoney } from '@/utils/formatMoney'

interface SuppliersModalProps {
  isOpen: boolean
  setOpen: (arg: boolean) => void
  data: FornecedorABC[]
}

export default function SuppliersModal({
  isOpen,
  setOpen,
  data,
}: SuppliersModalProps) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-20"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative w-full sm:w-auto bg-white rounded-lg shadow-xl">
              <div className="p-4 sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      Curva ABC Fornecedores (Custo)
                    </Dialog.Title>
                  </div>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[80vh]">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-200 sticky top-0">
                    <tr>
                      <th scope="col" className="px-6 py-3 w-12">
                        Nome
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total Acumulado
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Percentual
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Percentual Acumulado
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Classe
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <FornecedorItem key={item.CODI} fornecedor={item} />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-2 sm:p-3 bg-gray-50 flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center w-full sm:w-auto rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3"
                  onClick={() => setOpen(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const FornecedorItem = ({ fornecedor }: { fornecedor: FornecedorABC }) => (
  <tr className="bg-white border-b key={fornecedor.CODI}">
    <th
      scope="row"
      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
    >{`${fornecedor.CODI} - ${fornecedor.NOME.slice(0, 40)}`}</th>
    <td className="px-6 py-4">R${formatMoney(fornecedor.TOTAL)}</td>
    <td className="px-6 py-4">R${formatMoney(fornecedor.TotalAcumulado)}</td>
    <td className="px-6 py-4">{fornecedor.Percentual.toFixed(2)} %</td>
    <td className="px-6 py-4">{fornecedor.PercentualAcumulado.toFixed(2)} %</td>
    <td
      className={`px-6 py-4 font-semibold ${
        fornecedor.Classe === 'A'
          ? 'text-green-500'
          : fornecedor.Classe === 'B'
          ? 'text-yellow-500'
          : 'text-red-500'
      }`}
    >
      {fornecedor.Classe}
    </td>
  </tr>
)
