export interface PagedResponse<T> {
  page: number
  total: number
  data: Array<T>
}
