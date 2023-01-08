import { useEffect, useState } from 'react'
import { defaultQueryOptions } from '../../../api/imageApi'

import './TextSearch.scss'

interface SearchProps {
  setQuery: (query: string) => void
}

export default function TextSearch({ setQuery }: SearchProps) {
  const [searchInput, setSearchInput] = useState(defaultQueryOptions.q)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchInput != undefined) {
        setQuery(searchInput)
      }
    }, 400)

    return () => clearTimeout(delayDebounceFn)
  }, [searchInput, setQuery])

  return (
    <div className="text-search">
      <input className="text-search__input" type="search" value={searchInput} onChange={e => setSearchInput(e.target.value)} />
    </div>
  )
}
