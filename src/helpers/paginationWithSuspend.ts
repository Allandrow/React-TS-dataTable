import { useMemo } from 'react'
import { PaginationParams } from '../types'

export interface PaginationRenderOptions {
  minimumSuspendDistance: number
  doNotSuspendIfBelowThreshold: number
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
    minimumSuspendDistance: 4,
    doNotSuspendIfBelowThreshold: 8,
    siblingCount: 1,
  }

  const options: PaginationRenderOptions = {
    ...defaults,
    ...userOptions,
  }

  const paginationRenderProps = useMemo(() => {
    const { firstPage, lastPage, page } = pagination
    const { minimumSuspendDistance, doNotSuspendIfBelowThreshold, siblingCount } = options

    // include all pages in pageList
    if (lastPage < doNotSuspendIfBelowThreshold) {
      return {
        pageList: getRange(firstPage, lastPage),
        suspendAfterList: false,
        suspendBeforeList: false,
        ...pagination,
      }
    }

    // page within distance from the start
    if (page <= minimumSuspendDistance) {
      return {
        pageList: getRange(firstPage, minimumSuspendDistance + siblingCount),
        suspendAfterList: true,
        suspendBeforeList: false,
        ...pagination,
      }
    }

    // page within distance from the end
    if (page > lastPage - minimumSuspendDistance) {
      const firstPageAfterSuspend = lastPage - minimumSuspendDistance + 1 - siblingCount

      return {
        pageList: getRange(firstPageAfterSuspend, lastPage),
        suspendAfterList: false,
        suspendBeforeList: true,
        ...pagination,
      }
    }

    const firstPageAfterSuspend = page - siblingCount
    const lastPageBeforeSuspend = page + siblingCount

    // page - sibling next to firstPage
    if (page - siblingCount <= firstPage + 1) {
      return {
        pageList: getRange(firstPage, lastPageBeforeSuspend),
        suspendBeforeList: false,
        suspendAfterList: true,
        ...pagination,
      }
    }

    // page + sibling next to lastPage
    if (page + siblingCount >= lastPage - 1) {
      return {
        pageList: getRange(firstPageAfterSuspend, lastPage),
        suspendBeforeList: true,
        suspendAfterList: false,
        ...pagination,
      }
    }

    return {
      pageList: getRange(firstPageAfterSuspend, lastPageBeforeSuspend),
      suspendAfterList: true,
      suspendBeforeList: true,
      ...pagination,
    }
  }, [pagination, options])

  return paginationRenderProps
}
