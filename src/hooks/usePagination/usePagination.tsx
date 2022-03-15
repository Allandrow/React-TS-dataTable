export interface PaginationProps {
  page: number
  pageSize: number
  rowsLength: number
  setPage: (value: number) => void
}

export interface PaginationValues {
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
}: PaginationProps) => {
  const totalPageCount = Math.ceil(rowsLength / pageSize)

  if (totalPageCount === 0) {
    return null
  }

  return {
    firstPage: 1,
    lastPage: totalPageCount,
    page,
    setPage,
  } as PaginationValues
}
