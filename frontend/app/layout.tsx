// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aya Market - Decentralized Marketplace for Local Goods',
  description: 'Empowering local economies through decentralized commerce. Supporting artisans and communities across Nigeria.',
  keywords: ['marketplace', 'local goods', 'blockchain', 'Nigeria', 'artisans', 'decentralized'],
  authors: [{ name: 'Aya Market Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}