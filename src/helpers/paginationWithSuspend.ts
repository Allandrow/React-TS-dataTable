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

  const getFullPagesPagination = (firstPage: number, lastPage: number) => {
    return {
      pageList: getRange(firstPage, lastPage),
      suspendAfterList: false,
      suspendBeforeList: false,
      ...pagination,
    }
  }

  const paginationRenderProps: PaginationRenderValues = useMemo(() => {
    const { firstPage, lastPage, page } = pagination
    const { minimumSuspendDistance, doNotSuspendIfBelowThreshold, siblingCount } = options

    const displayAllPages = Math.max(
      doNotSuspendIfBelowThreshold,
      minimumSuspendDistance + siblingCount
    )

    // include all pages in pageList
    if (lastPage <= displayAllPages) {
      return getFullPagesPagination(firstPage, lastPage)
    }

    // page within distance from start, display distance + sibling then suspend to lastPage
    if (page <= minimumSuspendDistance) {
      const lastPageBeforeSuspend = minimumSuspendDistance + siblingCount

      // do not suspend if sibling + distance nears or over lastPage
      if (lastPageBeforeSuspend >= lastPage - 1) {
        return getFullPagesPagination(firstPage, lastPage)
      }
      return {
        pageList: getRange(firstPage, lastPageBeforeSuspend),
        suspendAfterList: true,
        suspendBeforeList: false,
        ...pagination,
      }
    }

    // page within distance from end, display firstPage then suspend then sibling + distance
    if (page > lastPage - minimumSuspendDistance) {
      const firstPageAfterSuspend = lastPage - minimumSuspendDistance - siblingCount + 1

      // do not suspend if sibling + distance nears or below firstPage
      if (firstPageAfterSuspend <= firstPage + 1) {
        return getFullPagesPagination(firstPage, lastPage)
      }

      return {
        pageList: getRange(firstPageAfterSuspend, lastPage),
        suspendAfterList: false,
        suspendBeforeList: true,
        ...pagination,
      }
    }

    const firstPageAfterSuspend = page - siblingCount
    const lastPageBeforeSuspend = page + siblingCount

    // page out of distance, sibling nears or below firstPage
    if (firstPageAfterSuspend <= firstPage + 1) {
      // do not suspend if page + sibling nears or over lastPage
      if (lastPageBeforeSuspend >= lastPage - 1) {
        return getFullPagesPagination(firstPage, lastPage)
      }

      return {
        pageList: getRange(firstPage, lastPageBeforeSuspend),
        suspendBeforeList: false,
        suspendAfterList: true,
        ...pagination,
      }
    }

    // page out of distance, sibling nears or over lastPage
    if (lastPageBeforeSuspend >= lastPage - 1) {
      return {
        pageList: getRange(firstPageAfterSuspend, lastPage),
        suspendBeforeList: true,
        suspendAfterList: false,
        ...pagination,
      }
    }

    // base case between distances
    return {
      pageList: getRange(firstPageAfterSuspend, lastPageBeforeSuspend),
      suspendBeforeList: true,
      suspendAfterList: true,
      ...pagination,
    }
  }, [pagination, options])

  return paginationRenderProps
}
