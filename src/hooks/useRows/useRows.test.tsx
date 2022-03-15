import { renderHook } from '@testing-library/react-hooks'
import { useRows } from './useRows'
import { SortBy } from '../useTable/useTable'
import { headers, data } from '../../fixtures'

const sorting: SortBy = { id: 'firstName', direction: 'descending' }

describe('useRows hook', () => {
  test('Returns rows array', () => {
    const { result } = renderHook(() => useRows({ data, headers, sorting }))

    expect(result.current).toHaveLength(3)
    expect(result.current[0].data[0].cellValue).toBe('Alayne')
    expect(result.current[0].data[0].key).toBe('firstName-Alayne')
    result.current.forEach(({ data }) => {
      expect(data).toHaveLength(headers.length)
    })
  })
})
