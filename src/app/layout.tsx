import { ReactNode } from 'react'
import { Barlow } from '@next/font/google'

import Nav from '../components/Nav'
import Providers from './providers'

import '../styles/globals.scss'
import './main.scss'

const mainFont = Barlow({ subsets: ['latin'], weight: ['200'] })


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang="fi">
        <body className={mainFont.className}>
          <Nav/>
          <main>
            <Providers>
              {children}
            </Providers>
          </main>
        </body>
      </html>
    </>
  )
}
