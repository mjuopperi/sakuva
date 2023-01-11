'use client'

import { defaultQueryOptions, Image } from '../api/imageApi'
import { useInfiniteSearchImages } from '../api/imageHooks'
import ImageList from '../components/ImageList'
import { useState } from 'react'
import Search from '../components/Search/Search'
import Button from '../components/common/Button'

import './content.scss'

interface ContentProps {
  initialData: Array<Image>
  initialTotal: number
}

export default function Content({ initialData, initialTotal }: ContentProps) {
  const [query, setQuery] = useState(defaultQueryOptions)
  const {
    data,
    hasNextPage,
    fetchNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    isFetching,
  } = useInfiniteSearchImages(query, initialData)
  const images = data?.pages.flatMap(page => page.data) || []

  return (
    <div className="content">
      <Search query={query} setQuery={setQuery}/>
      { hasPreviousPage && <Button onClick={() => fetchPreviousPage()} disabled={isFetching}>Lataa lisää</Button>}
      <ImageList images={images} />
      { hasNextPage && <Button onClick={() => fetchNextPage()} disabled={isFetching}>Lataa lisää</Button>}
    </div>
  )
}
