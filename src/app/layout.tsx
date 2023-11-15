import { Sidebar } from '@/components/Home/Sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: 'ADM Analytics | %s',
    default: 'ADM Analytics | Home',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`flex ${inter.className}`}>
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
