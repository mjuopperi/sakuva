import { useQuery } from '@tanstack/react-query'
import { Image, QueryOptions, searchImages } from './imageApi'

export function useSearchImages(queryOptions: QueryOptions, initialData: Array<Image>, initialTotal: number) {
  return useQuery({
    queryKey: ['images', queryOptions],
    queryFn: async () => await searchImages(queryOptions),
    initialData: { data: initialData, total: initialTotal },
    refetchOnWindowFocus: false,
  })
}
