'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { defaultQueryOptions, Image } from '../api/imageApi'
import { useInfiniteSearchImages } from '../api/imageHooks'
import ImageList from '../components/ImageList'
import Search from '../components/Search/Search'
import Button from '../components/common/Button'

import './content.scss'

interface ContentProps {
  initialData: Array<Image>
  initialTotal: number
}

export default function Content({ initialData, initialTotal }: ContentProps) {
  // rootMargin is top, right, bottom, left
  const { ref: loadMoreButtonRef, inView: loadMoreButtonInView } = useInView({ rootMargin: '0px 0px 50% 0px' })
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

  useEffect(() => {
    if (loadMoreButtonInView) fetchNextPage()
    // We only want to run this when visibility of the button changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMoreButtonInView])

  return (
    <div className="content">
      <Search query={query} setQuery={setQuery}/>
      { hasPreviousPage && <Button onClick={() => fetchPreviousPage()} disabled={isFetching}>Lataa lisää</Button>}
      <ImageList images={images} />
      { hasNextPage && (
        <div className="button-container" ref={loadMoreButtonRef}>
          <Button onClick={() => fetchNextPage()} disabled={isFetching}>Lataa lisää</Button>
        </div>
      )}
    </div>
  )
}
