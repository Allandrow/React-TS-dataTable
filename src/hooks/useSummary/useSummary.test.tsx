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

    const { originalLength, filteredLength, firstIndex, lastIndex } = result.current

    expect(originalLength).toBe(0)
    expect(filteredLength).toBe(0)
    expect(firstIndex).toBe(0)
    expect(lastIndex).toBe(0)
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

    const { originalLength, filteredLength, isFiltered, firstIndex, lastIndex } =
      result.current

    expect(originalLength).toBe(100)
    expect(filteredLength).toBe(0)
    expect(isFiltered).toBe(true)
    expect(firstIndex).toBe(0)
    expect(lastIndex).toBe(0)
  })

  test('data, no filtering', () => {
    const { result } = renderHook(() =>
      useSummary({ dataLength: 80, filteredDataLength: 80, pageSize: 50, page: 1 })
    )

    const { originalLength, filteredLength, isFiltered, firstIndex, lastIndex } =
      result.current

    expect(originalLength).toBe(80)
    expect(filteredLength).toBe(80)
    expect(isFiltered).toBe(false)
    expect(firstIndex).toBe(1)
    expect(lastIndex).toBe(50)
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

    const { originalLength, filteredLength, isFiltered, firstIndex, lastIndex } =
      result.current

    expect(originalLength).toBe(80)
    expect(filteredLength).toBe(35)
    expect(isFiltered).toBe(true)
    expect(firstIndex).toBe(1)
    expect(lastIndex).toBe(20)
  })

  test('data, last page with less items than pageSize', () => {
    const { result } = renderHook(() =>
      useSummary({
        dataLength: 97,
        filteredDataLength: 78,
        pageSize: 20,
        page: 4,
      })
    )

    const { originalLength, filteredLength, isFiltered, firstIndex, lastIndex } =
      result.current

    expect(originalLength).toBe(97)
    expect(filteredLength).toBe(78)
    expect(isFiltered).toBe(true)
    expect(firstIndex).toBe(61)
    expect(lastIndex).toBe(78)
  })
})
