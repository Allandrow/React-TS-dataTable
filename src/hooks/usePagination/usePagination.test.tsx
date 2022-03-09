import { renderHook } from '@testing-library/react-hooks'
import { usePagination } from './usePagination'

interface Params {
  currentPage: number
  pageSize: number
  rowsLength: number
  setCurrentPage: (value: number) => void
}

describe('usePagination hook', () => {
  const setCurrentPage = (value: number) => console.log(value)

  test('no data', () => {
    const params: Params = {
      currentPage: 1,
      pageSize: 10,
      rowsLength: 0,
      setCurrentPage,
    }

    const { result } = renderHook(() => usePagination(params))

    expect(result.current.pageList.length).toBe(0)
    expect(result.current.suspendAfterList).toBe(false)
    expect(result.current.suspendBeforeList).toBe(false)
  })

  test('less than 7 pages of data', () => {
    const params: Params = {
      currentPage: 1,
      pageSize: 10,
      rowsLength: 60,
      setCurrentPage,
    }

    const { result } = renderHook(() => usePagination(params))

    expect(result.current.pageList.length).toBe(6)
    expect(result.current.suspendAfterList).toBe(false)
    expect(result.current.suspendBeforeList).toBe(false)
  })

  test('more than 7 pages with current in first 5', () => {
    const params: Params = {
      currentPage: 3,
      pageSize: 10,
      rowsLength: 80,
      setCurrentPage,
    }

    const { result } = renderHook(() => usePagination(params))

    expect(result.current.pageList.length).toBe(5)
    expect(result.current.suspendAfterList).toBe(true)
    expect(result.current.suspendBeforeList).toBe(false)
    expect(result.current.lastPage).toBe(8)
  })

  test('more than 7 pages with current in last 4', () => {
    const params: Params = {
      currentPage: 7,
      pageSize: 10,
      rowsLength: 80,
      setCurrentPage,
    }

    const { result } = renderHook(() => usePagination(params))

    expect(result.current.pageList.length).toBe(5)
    expect(result.current.suspendAfterList).toBe(false)
    expect(result.current.suspendBeforeList).toBe(true)
    expect(result.current.firstPage).toBe(1)
  })

  test('current page not in first/last 4', () => {
    const params: Params = {
      currentPage: 10,
      pageSize: 10,
      rowsLength: 200,
      setCurrentPage,
    }

    const { result } = renderHook(() => usePagination(params))

    expect(result.current.pageList.length).toBe(3)
    expect(result.current.suspendAfterList).toBe(true)
    expect(result.current.suspendBeforeList).toBe(true)
    expect(result.current.firstPage).toBe(1)
    expect(result.current.lastPage).toBe(20)
  })
})
