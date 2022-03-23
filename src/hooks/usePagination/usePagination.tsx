interface PaginationProps {
  page: number
  pageSize: number
  rowsLength: number
}

export interface PaginationParams {
  firstPage: number
  lastPage: number
  page: number
}

export const usePagination = ({
  page,
  pageSize,
  rowsLength,
}: PaginationProps): PaginationParams | null => {
  const totalPageCount = Math.ceil(rowsLength / pageSize)

  if (!totalPageCount) return null

  return {
    firstPage: 1,
    lastPage: totalPageCount,
    page,
  }
}
