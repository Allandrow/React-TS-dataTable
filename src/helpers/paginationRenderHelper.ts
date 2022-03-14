import { useMemo } from 'react'
import { PaginationValues } from '../hooks/usePagination/usePagination'

interface PaginationRenderOptions {
  threshold: number
  displayedPagesUntilSuspend: number
  siblingCount: number
}

export interface PaginationRenderValues extends PaginationValues {
  pageList: number[]
  suspendAfterList: boolean
  suspendBeforeList: boolean
}

const getRange = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => {
    return i + start
  })
}

export const paginationRenderHelper = (
  pagination: PaginationValues,
  {
    threshold,
    displayedPagesUntilSuspend,
    siblingCount,
  }: Partial<PaginationRenderOptions>
) => {
  if (!pagination) return null

  const paginationRenderProps = useMemo(() => {
    const { firstPage, lastPage, page } = pagination

    const hasThreshold = threshold && siblingCount

    if (displayedPagesUntilSuspend && lastPage <= displayedPagesUntilSuspend) {
      return {
        pageList: getRange(firstPage, lastPage),
        suspendAfterList: false,
        suspendBeforeList: false,
        ...pagination,
      }
    }

    if (hasThreshold && page <= threshold) {
      return {
        pageList: getRange(firstPage, threshold + siblingCount),
        suspendAfterList: true,
        suspendBeforeList: false,
        ...pagination,
      }
    }

    if (hasThreshold && page > lastPage - threshold) {
      const firstPageAfterSuspend = lastPage - threshold - 1 + siblingCount

      return {
        pageList: getRange(firstPageAfterSuspend, lastPage),
        suspendAfterList: false,
        suspendBeforeList: true,
        ...pagination,
      }
    }

    if (siblingCount) {
      const firstPageAfterSuspend = page - siblingCount
      const lastPageBeforeSuspend = page + siblingCount

      return {
        pageList: getRange(firstPageAfterSuspend, lastPageBeforeSuspend),
        suspendAfterList: true,
        suspendBeforeList: true,
        ...pagination,
      }
    }
  }, [pagination, threshold, displayedPagesUntilSuspend, siblingCount])

  return paginationRenderProps
}
