import { renderHook } from '@testing-library/react-hooks'
import { useFiltering } from './useFiltering'
import { rows } from '../../fixtures'

describe('useFiltering hook', () => {
  test('returns data if no search value', () => {
    const { result } = renderHook(() => useFiltering({ data: rows, filter: '' }))

    expect(result.current).toStrictEqual(rows)
  })

  test('returns empty array if no match', () => {
    const { result } = renderHook(() =>
      useFiltering({ data: rows, filter: 'will not find any matches' })
    )

    expect(result.current).toStrictEqual([])
  })

  test('returns array of matches if cells contain search value', () => {
    const { result } = renderHook(() => useFiltering({ data: rows, filter: 'result' }))

    expect(result.current).toHaveLength(1)

    // value without business  is filtered out of results
    const undefinedEntry = result.current.find((entry) =>
      Object.values(entry).every((value) => {
        if (typeof value === 'string') return value.toLowerCase() !== 'result'
      })
    )

    expect(undefinedEntry).toBeUndefined()
  })
})
