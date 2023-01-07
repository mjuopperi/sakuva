import TextSearch from './TextSearch'

import './Search.scss'

interface SearchProps {
  setQuery: (query: string) => void
}

export default function Search({ setQuery }: SearchProps) {
  return (
    <div className="search">
      <TextSearch setQuery={setQuery}/>
    </div>
  )
}
