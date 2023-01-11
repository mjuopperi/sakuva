'use client'

import { defaultQueryOptions, Image } from '../api/imageApi'
import { useSearchImages } from '../api/imageHooks'
import ImageList from '../components/ImageList'
import { useState } from 'react'
import Search from '../components/Search/Search'

import './content.scss'

interface ContentProps {
  initialData: Array<Image>
  initialTotal: number
}

export default function Content({ initialData, initialTotal }: ContentProps) {
  const [query, setQuery] = useState(defaultQueryOptions)
  const { data } = useSearchImages(query, initialData, initialTotal)
  const images = data?.data || []

  return (
    <div className="content">
      <Search query={query} setQuery={setQuery}/>
      <ImageList images={images} />
    </div>
  )
}
