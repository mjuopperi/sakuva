import { useQuery } from '@tanstack/react-query'
import { Image, QueryOptions, searchImages } from './imageApi'

export function useSearchImages(queryOptions: QueryOptions, initialData: Array<Image>) {
  return useQuery({
    queryKey: ['images', queryOptions],
    queryFn: async () => await searchImages(queryOptions),
    initialData: initialData,
    refetchOnWindowFocus: false,
  })
}
