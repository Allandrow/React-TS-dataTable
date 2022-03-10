import { renderHook } from '@testing-library/react-hooks'
import { sample } from '../../../demo/fixtures/data'
import { useFiltering } from './useFiltering'

describe('useFiltering hook', () => {
  test('returns data if no search value', () => {
    const { result } = renderHook(() => useFiltering({ data: sample, searchValue: '' }))

    expect(result.current).toBe(sample)
  })

  test('returns empty array if no match', () => {
    const { result } = renderHook(() =>
      useFiltering({ data: sample, searchValue: 'will not find any matches' })
    )

    expect(result.current).toEqual([])
    expect(result.current).toHaveLength(0)
  })

  test('returns array of matches if cells contain search value', () => {
    const { result } = renderHook(() =>
      useFiltering({ data: sample, searchValue: 'business' })
    )

    expect(result.current).toHaveLength(2)
  })
})
