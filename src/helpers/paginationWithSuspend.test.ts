import { renderHook } from '@testing-library/react-hooks'
import { paginationWithSuspend } from './paginationWithSuspend'
import { PaginationParams } from '../types'

describe('pagination helper', () => {
  const pagination: PaginationParams = {
    firstPage: 1,
    lastPage: 7,
    page: 1,
    setPage: (value) => console.log(value),
  }
  test('Defaults displaying all pages, no suspend', () => {
    const { result } = renderHook(() => paginationWithSuspend(pagination))

    const { pageList, firstPage, lastPage, page, suspendAfterList, suspendBeforeList } =
      result.current

    expect(page).toBe(1)
    expect(pageList).toHaveLength(7)
    expect(firstPage).toBe(1)
    expect(lastPage).toBe(7)
    expect(suspendAfterList).toBe(false)
    expect(suspendBeforeList).toBe(false)
  })

  test('Defaults with more than 7 pages and page in first four', () => {
    const localPagination = { ...pagination, lastPage: 10 }

    const { result } = renderHook(() => paginationWithSuspend(localPagination))

    const { pageList, firstPage, lastPage, page, suspendAfterList, suspendBeforeList } =
      result.current

    expect(page).toBe(1)
    expect(pageList).toHaveLength(5)
    expect(firstPage).toBe(1)
    expect(lastPage).toBe(10)
    expect(suspendAfterList).toBe(true)
    expect(suspendBeforeList).toBe(false)
  })

  test('Defaults with more than 7 pages and page in last four', () => {
    const localPagination = { ...pagination, lastPage: 10, page: 8 }

    const { result } = renderHook(() => paginationWithSuspend(localPagination))

    const { pageList, firstPage, lastPage, page, suspendAfterList, suspendBeforeList } =
      result.current

    expect(page).toBe(8)
    expect(pageList).toHaveLength(5)
    expect(firstPage).toBe(1)
    expect(lastPage).toBe(10)
    expect(suspendAfterList).toBe(false)
    expect(suspendBeforeList).toBe(true)
  })

  test('Defaults with more than 7 pages and page not in first/last four', () => {
    const localPagination = { ...pagination, lastPage: 10, page: 6 }

    const { result } = renderHook(() => paginationWithSuspend(localPagination))

    const { pageList, firstPage, lastPage, page, suspendAfterList, suspendBeforeList } =
      result.current

    expect(page).toBe(6)
    expect(pageList).toHaveLength(3)
    expect(firstPage).toBe(1)
    expect(lastPage).toBe(10)
    expect(suspendAfterList).toBe(true)
    expect(suspendBeforeList).toBe(true)
  })

  test('adding options, siblingCount only', () => {
    const localPagination = { ...pagination, lastPage: 20, page: 10 }
    const options = {
      siblingCount: 2,
    }

    const { result } = renderHook(() => paginationWithSuspend(localPagination, options))

    const { pageList, firstPage, lastPage, page, suspendAfterList, suspendBeforeList } =
      result.current

    expect(page).toBe(10)
    expect(pageList).toHaveLength(5)
    expect(firstPage).toBe(1)
    expect(lastPage).toBe(20)
    expect(suspendAfterList).toBe(true)
    expect(suspendBeforeList).toBe(true)
  })

  test('adding options, displayedPagesUntilSuspend only', () => {
    const options = {
      displayedPagesUntilSuspend: 5,
    }

    const { result } = renderHook(() => paginationWithSuspend(pagination, options))

    const { pageList, firstPage, lastPage, page, suspendAfterList, suspendBeforeList } =
      result.current

    expect(page).toBe(1)
    expect(pageList).toHaveLength(5)
    expect(firstPage).toBe(1)
    expect(lastPage).toBe(7)
    expect(suspendAfterList).toBe(true)
    expect(suspendBeforeList).toBe(false)
  })

  test('adding options, suspendCountThreshold only', () => {
    const localPagination = { ...pagination, lastPage: 20, page: 1 }
    const options = {
      suspendCountThreshold: 10,
    }

    const { result } = renderHook(() => paginationWithSuspend(localPagination, options))

    const { pageList, firstPage, lastPage, page, suspendAfterList, suspendBeforeList } =
      result.current

    expect(page).toBe(1)
    expect(pageList).toHaveLength(11)
    expect(firstPage).toBe(1)
    expect(lastPage).toBe(20)
    expect(suspendAfterList).toBe(true)
    expect(suspendBeforeList).toBe(false)
  })
})
