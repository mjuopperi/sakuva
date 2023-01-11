import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { defaultQueryOptions, Image, QueryOptions, searchImages } from './imageApi'
import { PagedResponse } from './types'

export function useSearchImages(queryOptions: QueryOptions, initialData: Array<Image>, initialTotal: number) {
  return useQuery({
    queryKey: ['images', queryOptions],
    queryFn: async () => await searchImages(queryOptions),
    initialData: { page: defaultQueryOptions.page, data: initialData, total: initialTotal },
    refetchOnWindowFocus: false,
  })
}

export function useInfiniteSearchImages(queryOptions: QueryOptions, initialData: Array<Image>) {
  return useInfiniteQuery({
    queryKey: ['images', queryOptions],
    queryFn: async ({ pageParam = 1 }) => await searchImages({ ...queryOptions, page: pageParam }),
    getPreviousPageParam: (firstPage) => getPreviousPageNumber(firstPage),
    getNextPageParam: (lastPage) => getNextPageNumber(lastPage, queryOptions),

    refetchOnWindowFocus: false,
  })
}

function getPreviousPageNumber(firstPage: PagedResponse<any>): number | undefined {
  return firstPage.page > 1 ? firstPage.page - 1 : undefined
}

function getNextPageNumber<TQueryFnData>(lastPage: PagedResponse<any>, queryOptions: QueryOptions): number | undefined {
  const pageSize = queryOptions.size || defaultQueryOptions.size!
  return lastPage.page < lastPage.total / pageSize ? lastPage.page + 1 : undefined
}
