import { useMemo } from 'react'
import { PageDependant } from '../types'

interface UsePaginationProps extends PageDependant {
  dataLength: number
  siblingCount?: number
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
  dataLength,
  siblingCount = 1,
}: UsePaginationProps) => {
  const totalPageCount = Math.ceil(dataLength / pageSize)

  const pagination = useMemo(() => {
    const displayedPagesUntilSuspend = 7
    const suspendCountThreshold = 4

    if (totalPageCount === 0) {
      return { pageList: [], suspendBeforeList: false, suspendAfterList: false }
    }

    if (totalPageCount <= displayedPagesUntilSuspend) {
      return {
        pageList: getRange(1, totalPageCount, currentPage),
        suspendAfterList: false,
        suspendBeforeList: false,
      }
    }

    if (currentPage <= suspendCountThreshold) {
      return {
        pageList: getRange(1, suspendCountThreshold + siblingCount, currentPage),
        suspendBeforeList: false,
        suspendAfterList: true,
        lastPage: totalPageCount,
      }
    }

    if (currentPage > totalPageCount - suspendCountThreshold) {
      const firstPageAfterSuspend =
        totalPageCount - suspendCountThreshold - 1 + siblingCount
      return {
        pageList: getRange(firstPageAfterSuspend, totalPageCount, currentPage),
        suspendAfterList: false,
        suspendBeforeList: true,
        firstPage: 1,
      }
    }

    const firstPageAfterSuspend = currentPage - siblingCount
    const lastPageBeforeSuspend = currentPage + siblingCount

    return {
      pageList: getRange(firstPageAfterSuspend, lastPageBeforeSuspend, currentPage),
      suspendAfterList: true,
      suspendBeforeList: true,
      firstPage: 1,
      lastPage: totalPageCount,
    }
  }, [currentPage, totalPageCount, siblingCount])

  return pagination
}
