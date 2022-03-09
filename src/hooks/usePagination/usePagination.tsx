import { useMemo } from 'react'

interface PaginationProps {
  currentPage: number
  pageSize: number
  rowsLength: number
  siblintCount?: number
  setCurrentPage: (value: number) => void
}

export interface PaginationParams {
  pageList: { page: number; current?: boolean }[]
  suspendBeforeList: boolean
  suspendAfterList: boolean
  firstPage: number
  lastPage: number
  currentPage: number
  setCurrentPage: (value: number) => void
}

const getRange = (start: number, end: number, current: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => {
    const page = { page: i + start }
    return i + start === current ? { ...page, current: true } : page
  })
}

export const usePagination = ({
  currentPage,
  pageSize,
  rowsLength,
  siblintCount = 1,
  setCurrentPage,
}: PaginationProps) => {
  const totalPageCount = Math.ceil(rowsLength / pageSize)

  const pagination: Partial<PaginationParams> = useMemo(() => {
    const displayedPagesUntilSuspend = 7
    const suspendCountThreshold = 4

    if (totalPageCount === 0) {
      return {
        pageList: [],
        suspendBeforeList: false,
        suspendAfterList: false,
      }
    }

    if (totalPageCount <= displayedPagesUntilSuspend) {
      return {
        pageList: getRange(1, totalPageCount, currentPage),
        suspendBeforeList: false,
        suspendAfterList: false,
        currentPage,
        setCurrentPage,
      }
    }

    if (currentPage <= suspendCountThreshold) {
      return {
        pageList: getRange(1, suspendCountThreshold + siblintCount, currentPage),
        suspendBeforeList: false,
        suspendAfterList: true,
        lastPage: totalPageCount,
        currentPage,
        setCurrentPage,
      }
    }

    if (currentPage > totalPageCount - suspendCountThreshold) {
      const firstPageAfterSuspend =
        totalPageCount - suspendCountThreshold - 1 + siblintCount

      return {
        pageList: getRange(firstPageAfterSuspend, totalPageCount, currentPage),
        suspendBeforeList: true,
        suspendAfterList: false,
        firstPage: 1,
        currentPage,
        setCurrentPage,
      }
    }

    const firstPageAfterSuspend = currentPage - siblintCount
    const lastPageBeforeSuspend = currentPage + siblintCount

    return {
      pageList: getRange(firstPageAfterSuspend, lastPageBeforeSuspend, currentPage),
      suspendBeforeList: true,
      suspendAfterList: true,
      firstPage: 1,
      lastPage: totalPageCount,
      currentPage,
      setCurrentPage,
    }
  }, [currentPage, totalPageCount, siblintCount])

  return pagination
}
