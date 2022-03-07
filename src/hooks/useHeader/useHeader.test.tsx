import { renderHook } from '@testing-library/react-hooks'
import { columns } from '../../../demo/fixtures/columns'
import { SortBy } from '../useTable/useTable'
import { useHeader } from './useHeader'

const sorting: SortBy = { id: 'firstName', direction: 'descending' }

const sortingHandler = (value: SortBy) => console.log(value)

describe('useHeader hook', () => {
  test('Returns headers array', () => {
    const { result } = renderHook(() => useHeader({ columns, sorting, sortingHandler }))

    expect(result.current).toHaveLength(9)
    expect(result.current[0].text).toBe('First Name')
    expect(result.current[0].classNames).toHaveLength(2)
    expect(result.current[0].classNames).toContain('sorted')
    expect(result.current[0].classNames).toContain('descending')
    expect(result.current[1].classNames).toHaveLength(0)
  })
})
