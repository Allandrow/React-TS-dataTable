import { renderHook } from '@testing-library/react-hooks'
import { columns } from '../../../demo/fixtures/columns'
import { useFeatures } from './useFeatures'

describe('useFeatures hook', () => {
  test('Default features values', () => {
    const { result } = renderHook(() => useFeatures({ columns }))

    expect(result.current.sortBy).toBeDefined()
    expect(result.current.sortBy).toEqual({ id: 'firstName', direction: 'descending' })
  })

  test('Disabled', () => {
    const { result } = renderHook(() =>
      useFeatures({ columns, options: { disabled: ['sortBy'] } })
    )

    expect(result.current).toEqual({})
    expect(result.current.sortBy).toBeUndefined()
  })

  test('Options overriding default setup', () => {
    const { result } = renderHook(() =>
      useFeatures({
        columns,
        options: { sortBy: { id: 'zipCode', direction: 'ascending' } },
      })
    )

    expect(result.current.sortBy).toBeDefined()
    expect(result.current.sortBy).toEqual({ id: 'zipCode', direction: 'ascending' })
  })
})
