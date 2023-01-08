'use client'

import { defaultQueryOptions, Image } from '../api/imageApi'
import { useSearchImages } from '../api/imageHooks'
import ImageList from '../components/ImageList'
import { useState } from 'react'
import Search from '../components/Search/Search'

import './content.scss'

interface ContentProps {
  initialData: Array<Image>
}

export default function Content({ initialData }: ContentProps) {
  const [query, setQuery] = useState(defaultQueryOptions.q)
  const { data: images } = useSearchImages({ q: query, color: defaultQueryOptions.color }, initialData)

  return (
    <div className="content">
      <Search setQuery={setQuery}/>
      <ImageList images={images} />
    </div>
  )
}
