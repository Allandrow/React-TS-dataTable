import { act, renderHook } from '@testing-library/react-hooks'
import { useSorting } from './useSorting'
import { data, columns, sorting } from '../../fixtures'
import { SortBy } from '../../types'

describe('useSorting hook', () => {
  test('sorting with a custom method', () => {
    const localSorting: SortBy = { id: 'city', direction: 'ascending' }
    const { result } = renderHook(() =>
      useSorting({ data, sorting: localSorting, columns })
    )

    expect(result.current[0].city).toBe('Saint Petersburg')
    expect(result.current[2].city).toBe('Austin')
  })

  test('Throws if sortMethod is not in sorting functions map', () => {
    const localColumns = columns
    localColumns[0].sortMethod = 'sortInvalid'

    expect(() => {
      const { result } = renderHook(() => useSorting({ data, sorting, columns }))
      return result.current
    }).toThrow()
  })
})
