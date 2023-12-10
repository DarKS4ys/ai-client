import Nav from '@/components/Nav'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'
import Footer from '@/components/Footer'
import { EdgeStoreProvider } from '@/lib/edgestore'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Savills AI',
  description: 'Savills AI app - beta version',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EdgeStoreProvider>
          <Providers>
            <Nav/>
            {children}
            {/* <Footer/> */}
          </Providers>
        </EdgeStoreProvider>
        </body>
    </html>
  )
}
