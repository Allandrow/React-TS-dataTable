import { renderHook } from '@testing-library/react-hooks'
import { usePagination } from './usePagination'

interface Params {
  page: number
  pageSize: number
  rowsLength: number
  setPage: (value: number) => void
}

describe('usePagination hook', () => {
  const setPage = (value: number) => console.log(value)

  test('no data', () => {
    const params: Params | null = {
      page: 1,
      pageSize: 10,
      rowsLength: 0,
      setPage,
    }

    const { result } = renderHook(() => usePagination(params))

    expect(result.current).toBeNull()
  })

  test('pagination object', () => {
    const params: Params | null = {
      page: 1,
      pageSize: 20,
      rowsLength: 100,
      setPage,
    }

    const { result } = renderHook(() => usePagination(params))

    expect(result.current.firstPage).toBe(1)
    expect(result.current.lastPage).toBe(5)
    expect(result.current.page).toBe(1)
  })
})
