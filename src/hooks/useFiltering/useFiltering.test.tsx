import { renderHook } from '@testing-library/react-hooks'
import { useFiltering } from './useFiltering'
import { data } from '../../fixtures'

describe('useFiltering hook', () => {
  test('returns data if no search value', () => {
    const { result } = renderHook(() => useFiltering({ data, filter: '' }))

    expect(result.current).toBe(data)
  })

  test('returns empty array if no match', () => {
    const { result } = renderHook(() =>
      useFiltering({ data: data, filter: 'will not find any matches' })
    )

    expect(result.current).toEqual([])
    expect(result.current).toHaveLength(0)
  })

  test('returns array of matches if cells contain search value', () => {
    const { result } = renderHook(() => useFiltering({ data: data, filter: 'business' }))

    expect(result.current).toHaveLength(2)
  })
})
