import Image from 'next/image'
import Logo from '../../assets/images/admLogo.png'
import Link from 'next/link'
import { LogOutButton } from './LogOutButton'
import {
  Home,
  LucideIcon,
  CoinsIcon,
  BadgeCent,
  PackageSearch,
  Users,
} from 'lucide-react'

const pages = [
  {
    href: '/dashboard/home',
    childrenText: 'Home',
    icon: Home,
  },
  {
    href: '/dashboard/financial',
    childrenText: 'Financeiro',
    icon: CoinsIcon,
  },
  {
    href: '/dashboard/sales',
    childrenText: 'Vendas',
    icon: BadgeCent,
  },
  {
    href: '/dashboard/products',
    childrenText: 'Produtos',
    icon: PackageSearch,
  },
  {
    href: '/dashboard/clients',
    childrenText: 'Clientes',
    icon: Users,
  },
] as LinkComponentProps[]

const Sidebar = () => {
  return (
    <nav className="bg-blue-500 h-screen w-64 fixed text-white p-4 flex flex-col">
      <Image src={Logo} alt="Logoitipo com as letras A - D - M" width="300" />
      <ul className="mt-4">
        {pages.map((page) => (
          <LinkComponent
            key={page.href}
            href={page.href}
            childrenText={page.childrenText}
            icon={page.icon}
          />
        ))}
      </ul>
      <LogOutButton />
      <p className="mt-auto bottom-0 text-xs">
        2023-2024 © Adm Informática v.1.0.0
      </p>
    </nav>
  )
}

export { Sidebar }

interface LinkComponentProps {
  href: string
  childrenText: string
  icon: LucideIcon
}

const LinkComponent = ({
  href,
  childrenText,
  icon: Icon,
}: LinkComponentProps) => {
  return (
    <li className="mb-4">
      <Link
        href={href}
        className="flex items-center gap-4 px-4 py-2 rounded hover:bg-blue-400"
      >
        <Icon size={20} />
        <span className="text-base font-semibold">{childrenText}</span>
      </Link>
    </li>
  )
}
