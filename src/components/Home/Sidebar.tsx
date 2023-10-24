import Image from 'next/image'
import Logo from '../../assets/images/admLogo.png'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <nav className="bg-blue-600 h-screen w-64 text-white p-4 flex flex-col">
      <Image src={Logo} alt="Logoitipo com as letras A - D - M" width="200" />
      <ul className="mt-4">
        <li className="mb-4">
          <Link href="/" className="block px-4 py-2 rounded hover:bg-blue-500">
            Home
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="/financial"
            className="block px-4 py-2 rounded hover:bg-blue-500"
          >
            Financeiro
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="/sales"
            className="block px-4 py-2 rounded hover:bg-blue-500"
          >
            Vendas
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="/products"
            className="block px-4 py-2 rounded hover:bg-blue-500"
          >
            Produtos
          </Link>
        </li>
        <li>
          <Link
            href="/clients"
            className="block px-4 py-2 rounded hover:bg-blue-500"
          >
            Clientes
          </Link>
        </li>
      </ul>
      <p className="mt-auto bottom-0 text-sm">
        2023-2023 © Adm Sistemas v.1.10.1
      </p>
    </nav>
  )
}

export { Sidebar }
