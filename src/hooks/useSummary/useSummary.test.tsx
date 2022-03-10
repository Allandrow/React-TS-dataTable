import { renderHook } from '@testing-library/react-hooks'
import { useSummary } from './useSummary'

describe('useSummary hook', () => {
  test('No data', () => {
    const { result } = renderHook(() =>
      useSummary({
        dataLength: 0,
        filteredDataLength: 0,
        pageSize: 10,
        page: 1,
      })
    )

    expect(result.current.originalLength).toBe(0)
    expect(result.current.filteredLength).toBe(0)
    expect(result.current.firstIndex).toBe(0)
    expect(result.current.lastIndex).toBe(0)
  })

  test('data, filtering, no filtering data', () => {
    const { result } = renderHook(() =>
      useSummary({
        dataLength: 100,
        filteredDataLength: 0,
        pageSize: 10,
        page: 1,
      })
    )

    expect(result.current.originalLength).toBe(100)
    expect(result.current.filteredLength).toBe(0)
    expect(result.current.firstIndex).toBe(0)
    expect(result.current.lastIndex).toBe(0)
  })

  test('data, filtering, filtering data', () => {
    const { result } = renderHook(() =>
      useSummary({
        dataLength: 80,
        filteredDataLength: 35,
        pageSize: 20,
        page: 1,
      })
    )

    expect(result.current.originalLength).toBe(80)
    expect(result.current.filteredLength).toBe(35)
    expect(result.current.firstIndex).toBe(1)
    expect(result.current.lastIndex).toBe(20)
  })

  test('data, last page with less items than pageSize', () => {
    const { result } = renderHook(() =>
      useSummary({
        dataLength: 97,
        filteredDataLength: 97,
        pageSize: 20,
        page: 5,
      })
    )

    expect(result.current.originalLength).toBe(97)
    expect(result.current.filteredLength).toBe(97)
    expect(result.current.firstIndex).toBe(81)
    expect(result.current.lastIndex).toBe(97)
  })
})
