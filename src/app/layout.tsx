import { ReactNode } from 'react'
import { Barlow } from '@next/font/google'

import { defaultQueryOptions, searchImages } from '../api/imageApi'
import Nav from '../components/Nav'
import Providers from './providers'
import Content from './content'

import '../styles/globals.scss'
import './main.scss'

const mainFont = Barlow({ subsets: ['latin'], weight: ['200'] })


export default async function RootLayout({ children }: { children: ReactNode }) {
  const initialData = await searchImages(defaultQueryOptions)
  return (
    <html lang="fi">
      <body className={mainFont.className}>
        <Nav/>
        <main id="main">
          <Providers>
            {children}
            <Content initialData={[]} initialTotal={0} />
          </Providers>
        </main>
      </body>
    </html>
  )
}
