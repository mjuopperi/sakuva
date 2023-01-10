import { useEffect, useState } from 'react'
import { defaultQueryOptions } from '../../../api/imageApi'

import './TextSearch.scss'

interface SearchProps {
  initialValue?: string
  setQuery: (query: string) => void
}

export default function TextSearch({ initialValue = '', setQuery }: SearchProps) {
  const [searchInput, setSearchInput] = useState(initialValue)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchInput != undefined) {
        setQuery(searchInput)
      }
    }, 400)

    return () => clearTimeout(delayDebounceFn)
    // We only want to run this when searchInput changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  return (
    <div className="text-search">
      <input
        className="text-search__input"
        type="search"
        placeholder="Hae kuvia"
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
      />
    </div>
  )
}
