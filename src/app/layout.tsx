import Link from 'next/link'
// import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav className='flex item-center gap-3'>
            <Link href="/">Home</Link>
            <Link href="/tui-example">TuiEx</Link>
            <Link href="/tui">Tui</Link>
          </nav>
        </header>
        {children}
        </body>
    </html>
  )
}
