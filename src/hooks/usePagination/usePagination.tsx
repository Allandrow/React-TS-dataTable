interface PaginationProps {
  page: number
  pageSize: number
  rowsLength: number
  setPage: (value: number) => void
}

export interface PaginationParams {
  firstPage: number
  lastPage: number
  page: number
  setPage: (value: number) => void
}

export const usePagination = ({
  page,
  pageSize,
  rowsLength,
  setPage,
}: PaginationProps): PaginationParams | null => {
  const totalPageCount = Math.ceil(rowsLength / pageSize)

  if (!totalPageCount) return null

  return {
    firstPage: 1,
    lastPage: totalPageCount,
    page,
    setPage,
  }
}
