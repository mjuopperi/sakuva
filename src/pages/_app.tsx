import type {AppProps} from 'next/app'
import {Barlow} from '@next/font/google'
import Head from 'next/head'

const mainFont = Barlow({subsets: ['latin'], weight: ['200']})

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={mainFont.className}>
        <Component
          {...pageProps} />
      </main>
    </>
  )
}
