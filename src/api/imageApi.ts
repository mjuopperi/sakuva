import { apiUrl } from './apiUtils'


export interface QueryOptions {
  q?: string
  start?: Date
  end?: Date
  color?: boolean
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

export async function searchImages(queryOptions: QueryOptions = defaultQueryOptions): Promise<Array<Image>> {
  const params = new URLSearchParams(toQuery(queryOptions))
  const res = await fetch(apiUrl(`/api/image/search?${params}`))
  return res.json()
}
