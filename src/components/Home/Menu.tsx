'use client'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  GlobeAmericasIcon,
  PhoneIcon
} from '@heroicons/react/20/solid'
import {
  ChartBarIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline'

import { LogOut } from 'lucide-react'
import { LogOutButton } from './LogOutButton'

const solutions = [
  {
    name: 'Home',
    description: 'Tenha uma visão geral da sua empresa',
    href: '/dashboard/home',
    icon: ChartBarIcon,
  },
  {
    name: 'Financeiro',
    description: 'Faça a análise financeira de sua empresa',
    href: '/dashboard/financial',
    icon: BanknotesIcon,
  },
  {
    name: 'Vendas',
    description: 'Confira como estão suas vendas',
    href: '/dashboard/sales',
    icon: ShoppingCartIcon,
  },
  {
    name: 'Produtos',
    description: 'Seu estoque em sua mão',
    href: '/dashboard/products',
    icon: ShoppingBagIcon,
  },
  {
    name: 'Clientes',
    description: 'Acompanhe seus clientes',
    href: '/dashboard/clients',
    icon: UserGroupIcon,
  },
]
const callsToAction = [
  {
    name: 'Nossos produtos',
    href: 'https://web.adminfo.com.br/',
    icon: GlobeAmericasIcon,
  },
  // {
  //   name: 'LogOut',
  //   href: 'https://api.whatsapp.com/send?1=pt_BR&phone=5549988080074',
  //   icon: LogOut,
  // },
]

export function Menu() {
  return (
    <Popover className="fixed w-full z-20">
      <div className="flex items-center w-full justify-between p-2 bg-blue-500 text-white">
        <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6">
          <span>Menu</span>
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </Popover.Button>

        <p className="text-sm font-semibold leading-6">
          Covatti Acabamentos S.A
        </p>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {solutions.map((item) => (
                <div
                  key={item.name}
                  className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <item.icon
                      className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <a href={item.href} className="font-semibold text-gray-900">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
              {callsToAction.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                  target="_blank"
                >
                  <item.icon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
              <LogOutButton />
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
