import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Peter Vargas | Cybersecurity for the 🌎 | Kudo | DivisionCero | Conan',
  description: 'Personal site of Peter Vargas, passionate about creating things that contribute to the 🌎 Explore cybersecurity insights, Kudo, DivisionCero, and Conan projects',
  keywords: ['Peter Vargas', 'Cybersecurity', 'Kudo', 'DivisionCero', 'Conan', 'DFIR', 'Learning', 'Training']
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
