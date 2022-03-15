import { renderHook } from '@testing-library/react-hooks'
import { useFiltering } from './useFiltering'
import { data } from '../../fixtures'

describe('useFiltering hook', () => {
  test('returns data if no search value', () => {
    const { result } = renderHook(() => useFiltering({ data, filter: '' }))

    expect(result.current).toStrictEqual(data)
  })

  test('returns empty array if no match', () => {
    const { result } = renderHook(() =>
      useFiltering({ data: data, filter: 'will not find any matches' })
    )

    expect(result.current).toStrictEqual([])
  })

  test('returns array of matches if cells contain search value', () => {
    const { result } = renderHook(() => useFiltering({ data: data, filter: 'business' }))

    expect(result.current).toHaveLength(2)

    // value without business  is filtered out of results
    const undefinedEntry = result.current.find((entry) =>
      Object.values(entry).every((value) => {
        if (typeof value === 'string') return value.toLowerCase() !== 'business'
      })
    )

    expect(undefinedEntry).toBeUndefined()
  })
})
