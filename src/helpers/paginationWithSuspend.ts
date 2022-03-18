import { useMemo } from 'react'
import { PaginationParams } from '../types'

interface PaginationRenderOptions {
  suspendCountThreshold: number
  displayedPagesUntilSuspend: number
  siblingCount: number
}

export interface PaginationRenderValues extends PaginationParams {
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

export const paginationWithSuspend = (
  pagination: PaginationParams,
  userOptions?: Partial<PaginationRenderOptions>
): PaginationRenderValues => {
  const defaults: PaginationRenderOptions = {
    suspendCountThreshold: 4,
    displayedPagesUntilSuspend: 7,
    siblingCount: 1,
  }

  const options: PaginationRenderOptions = {
    ...defaults,
    ...userOptions,
  }

  const paginationRenderProps = useMemo(() => {
    const { firstPage, lastPage, page } = pagination
    const { suspendCountThreshold, displayedPagesUntilSuspend, siblingCount } = options

    if (lastPage <= displayedPagesUntilSuspend) {
      return {
        pageList: getRange(firstPage, lastPage),
        suspendAfterList: false,
        suspendBeforeList: false,
        ...pagination,
      }
    }

    if (page <= suspendCountThreshold) {
      return {
        pageList: getRange(firstPage, suspendCountThreshold + siblingCount),
        suspendAfterList: true,
        suspendBeforeList: false,
        ...pagination,
      }
    }

    if (page > lastPage - suspendCountThreshold) {
      const firstPageAfterSuspend = lastPage - suspendCountThreshold - 1 + siblingCount

      return {
        pageList: getRange(firstPageAfterSuspend, lastPage),
        suspendAfterList: false,
        suspendBeforeList: true,
        ...pagination,
      }
    }

    const firstPageAfterSuspend = page - siblingCount
    const lastPageBeforeSuspend = page + siblingCount

    return {
      pageList: getRange(firstPageAfterSuspend, lastPageBeforeSuspend),
      suspendAfterList: true,
      suspendBeforeList: true,
      ...pagination,
    }
  }, [pagination, options])

  return paginationRenderProps
}