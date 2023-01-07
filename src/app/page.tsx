import React from 'react'

import Content from './content'
import { defaultQueryOptions, searchImages } from '../api/imageApi'

export default async function Home({}) {
  const initialData = await searchImages(defaultQueryOptions)
  return (
    <>
      <Content initialData={initialData} />
    </>
  )
}
