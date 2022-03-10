import { useMemo } from 'react'

interface PaginationProps {
  page: number
  pageSize: number
  rowsLength: number
  setPage: (value: number) => void
}

export interface Pagination {
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

  const pagination: Pagination | null = useMemo(() => {
    if (totalPageCount === 0) {
      return null
    }

    return {
      firstPage: 1,
      lastPage: totalPageCount,
      page,
      setPage,
    }
  }, [page, totalPageCount])

  return pagination
}
