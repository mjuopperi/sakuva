import { QueryOptions } from '../../api/imageApi'
import TextSearch from './TextSearch'
import Checkbox from '../common/Checkbox'

import './Search.scss'

interface SearchProps {
  query: QueryOptions
  setQuery: (query: QueryOptions) => void
}

export default function Search({ query, setQuery }: SearchProps) {
  function handleColorCheckbox(isColor: boolean) {
    if (isColor) setQuery({ ...query, color: true })
    else setQuery({ ...query, color: undefined }) // The toggle is for *only* color images
  }
  return (
    <div className="search">
      <TextSearch setQuery={q => setQuery({ ...query, q })}/>
      <Checkbox name="color" onChange={handleColorCheckbox} initialValue={query.color}>Vain värikuvat</Checkbox>
    </div>
  )
}
