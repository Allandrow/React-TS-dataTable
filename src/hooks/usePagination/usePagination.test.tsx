import { renderHook } from '@testing-library/react-hooks'
import { usePagination } from './usePagination'

interface Params {
  page: number
  pageSize: number
  rowsLength: number
}

describe('usePagination hook', () => {
  const defaultParams: Params = {
    page: 3,
    pageSize: 10,
    rowsLength: 100,
  }

  test('no data', () => {
    const noData: Params = {
      ...defaultParams,
      page: 1,
      rowsLength: 0,
    }
    const { result } = renderHook(() => usePagination(noData))
    expect(result.current).toBeNull()
  })

  test('pagination object', () => {
    const { result } = renderHook(() => usePagination(defaultParams))

    if (result.current) {
      expect(result.current.firstPage).toBe(1)
      expect(result.current.lastPage).toBe(10)
      expect(result.current.page).toBe(3)
    }
  })
})
