import { apiUrl } from './apiUtils'
import { PagedResponse } from './types'


export interface QueryOptions {
  q?: string
  start?: Date
  end?: Date
  color?: boolean
  size?: number
  page?: number
}

function toQuery(queryOptions: QueryOptions): Record<string, string> {
  return Object.entries(queryOptions).reduce((acc, [key, value]) => {
    return {
      ...acc,
      ...(value == undefined ? {} : { [key]: `${value}` })
    }
  }, {})
}

export const defaultQueryOptions: QueryOptions = {
  q: '',
  start: undefined,
  end: undefined,
  color: undefined,
  size: 15,
  page: 1,
}

export interface Image {
  id: number
  photographer?: string
  caption: string
  description: string,
  location?: string,
  date?: Date,
  width: number,
  height: number,
  isColor: boolean,
  isPlaceholder: boolean,
  urlPath: string,
}

export async function searchImages(queryOptions: QueryOptions = defaultQueryOptions): Promise<PagedResponse<Image>> {
  const params = new URLSearchParams(toQuery(queryOptions))
  const res = await fetch(apiUrl(`/api/image/search?${params}`))
  const total = parseInt(res.headers.get('x-total-count') || '0')
  const data = await res.json()
  return { total, data }
}
