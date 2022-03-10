import { renderHook } from '@testing-library/react-hooks'
import { useRecap } from './useRecap'

describe('useRecap hook', () => {
  test('No data', () => {
    const { result } = renderHook(() =>
      useRecap({
        dataLength: 0,
        filteredDataLength: undefined,
        pageSize: 10,
        currentPage: 1,
      })
    )

    expect(result.current.originalLength).toBe(0)
    expect(result.current.currentLength).toBe(0)
    expect(result.current.indices).toEqual({ first: 0, last: 0 })
  })

  test('data, filtering, no filtering data', () => {
    const { result } = renderHook(() =>
      useRecap({
        dataLength: 100,
        filteredDataLength: 0,
        pageSize: 10,
        currentPage: 1,
      })
    )

    expect(result.current.originalLength).toBe(100)
    expect(result.current.currentLength).toBe(0)
    expect(result.current.indices).toEqual({ first: 0, last: 0 })
  })

  test('data, filtering, filtering data', () => {
    const { result } = renderHook(() =>
      useRecap({
        dataLength: 80,
        filteredDataLength: 35,
        pageSize: 20,
        currentPage: 1,
      })
    )

    expect(result.current.originalLength).toBe(80)
    expect(result.current.currentLength).toBe(35)
    expect(result.current.indices).toEqual({ first: 1, last: 20 })
  })

  test('data, last page with less items than pageSize', () => {
    const { result } = renderHook(() =>
      useRecap({
        dataLength: 97,
        filteredDataLength: undefined,
        pageSize: 20,
        currentPage: 5,
      })
    )

    expect(result.current.originalLength).toBe(97)
    expect(result.current.currentLength).toBe(97)
    expect(result.current.indices).toEqual({ first: 81, last: 97 })
  })
})
