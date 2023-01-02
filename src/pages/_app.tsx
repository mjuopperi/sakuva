import type {AppProps} from 'next/app'
import {Barlow} from '@next/font/google'

const mainFont = Barlow({subsets: ['latin'], weight: ['200']})

export default function App({Component, pageProps}: AppProps) {
  return (
    <main className={mainFont.className}>
      <Component
        {...pageProps} />
    </main>
  )
}
