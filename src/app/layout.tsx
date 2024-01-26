import './globals.css'
import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'

const kanit = Kanit({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: {
    template: 'ADM Analytics | %s',
    default: 'ADM Analytics | Login',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-screen">
      <body className={`${kanit.className} h-screen bg-gray-100`}>{children}</body>
    </html>
  )
}
