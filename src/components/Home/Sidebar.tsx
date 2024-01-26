import Image from 'next/image'
import Logo from '../../assets/images/admLogo.png'
import Link from 'next/link'
import { LogOutButton } from './LogOutButton'

const pages = [
  {
    href: '/dashboard/home',
    childrenText: 'Home'
  },
  {
    href: '/dashboard/financial',
    childrenText: 'Financeiro'
  },
  {
    href: '/dashboard/sales',
    childrenText: 'Vendas'
  },
  {
    href: '/dashboard/products',
    childrenText: 'Produtos'
  },
  {
    href: '/dashboard/clients',
    childrenText: 'Clientes'
  }
]

const Sidebar = () => {
  return (
    <nav className="bg-blue-500 h-screen w-64 fixed text-white p-4 flex flex-col">
      <Image src={Logo} alt="Logoitipo com as letras A - D - M" width="200" />
      <ul className="mt-4">
        {pages.map((page) => <LinkComponent key={page.href} href={page.href} childrenText={page.childrenText} />)}
      </ul>
      <LogOutButton />
      <p className="mt-auto bottom-0 text-sm">
        2023-2023 © Adm Sistemas v.1.10.1
      </p>
    </nav>
  )
}

export { Sidebar }

interface LinkComponentProps {
  href: string
  childrenText: string
}

const LinkComponent = ({ href, childrenText }: LinkComponentProps) => {
  return (
    <li className="mb-4">
      <Link
        href={href}
        className="block px-4 py-2 rounded hover:bg-blue-500"
      >
        {childrenText}  
      </Link>
    </li>
  )
}


